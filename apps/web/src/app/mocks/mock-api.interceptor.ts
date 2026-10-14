import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { API_BASE_URL, USE_MOCK_API } from '../configs/api.config';
import {
  CreateRoomRequest,
  ProblemsListResponse,
  Room,
  RoomPreview,
} from '../services/api/api.types';
import {
  MOCK_CURRENT_USER,
  MOCK_LISTS,
  MOCK_PROBLEMS,
  MOCK_ROOMS,
  MOCK_TAGS,
} from './mock-data';

const LATENCY_MS = 350;

type MockHandler = (req: HttpRequest<unknown>, params: string[]) => Observable<HttpEvent<unknown>>;

interface MockRoute {
  method: string;
  pattern: RegExp;
  handler: MockHandler;
}

function ok<T>(body: T, status = 200): Observable<HttpEvent<T>> {
  return of(new HttpResponse({ status, body })).pipe(delay(LATENCY_MS));
}

function fail(req: HttpRequest<unknown>, status: number, message: string, error: string): Observable<never> {
  return timer(LATENCY_MS).pipe(
    mergeMap(() => throwError(() => new HttpErrorResponse({
      status,
      statusText: error,
      url: req.urlWithParams,
      error: { statusCode: status, message, error },
    }))),
  );
}

function generateRoomCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  do {
    code = Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
  } while (MOCK_ROOMS.has(code));
  return code;
}

function toPreview(room: Room): RoomPreview {
  return {
    code: room.code,
    name: room.name,
    mode: room.mode,
    status: room.status,
    hostName: room.host.username,
    participantCount: room.participants.length,
    maxParticipants: room.settings.maxParticipants,
    problemCount: room.problemIds.length,
  };
}

const routes: MockRoute[] = [
  {
    method: 'GET',
    pattern: /^\/profile$/,
    handler: () => ok({ user: MOCK_CURRENT_USER }),
  },
  {
    method: 'GET',
    pattern: /^\/problems\/tags$/,
    handler: () => ok(MOCK_TAGS),
  },
  {
    method: 'GET',
    pattern: /^\/problem-lists$/,
    handler: () => ok(MOCK_LISTS),
  },
  {
    method: 'GET',
    pattern: /^\/problems$/,
    handler: req => {
      const search = req.params.get('search')?.trim().toLowerCase() ?? '';
      const difficulty = req.params.get('difficulty');
      const tags = req.params.get('tags')?.split(',').filter(Boolean) ?? [];
      const list = req.params.get('list');
      const page = Number(req.params.get('page') ?? 1);
      const limit = Number(req.params.get('limit') ?? 20);

      const matches = MOCK_PROBLEMS.filter(p =>
        (!search || p.title.toLowerCase().includes(search) || p.tags.some(t => t.name.toLowerCase().includes(search)) || String(p.id) === search) &&
        (!difficulty || p.difficulty === difficulty) &&
        (tags.length === 0 || p.tags.some(t => tags.includes(t.slug))) &&
        (!list || p.lists.includes(list))
      );

      const body: ProblemsListResponse = {
        problems: matches.slice((page - 1) * limit, page * limit).map(({ lists, ...summary }) => summary),
        total: matches.length,
        page,
        limit,
        totalPages: Math.ceil(matches.length / limit),
      };
      return ok(body);
    },
  },
  {
    method: 'POST',
    pattern: /^\/rooms$/,
    handler: req => {
      const body = req.body as CreateRoomRequest;
      if (!body?.name?.trim()) {
        return fail(req, 400, 'Room name is required', 'Bad Request');
      }
      if (!body.problemIds?.length) {
        return fail(req, 400, 'Select at least one problem', 'Bad Request');
      }

      const host = { id: MOCK_CURRENT_USER.id, username: MOCK_CURRENT_USER.username, isHost: true };
      const room: Room = {
        id: crypto.randomUUID(),
        code: generateRoomCode(),
        name: body.name.trim(),
        mode: body.mode,
        status: 'LOBBY',
        host,
        participants: [host],
        problemIds: body.problemIds,
        settings: {
          maxParticipants: body.maxParticipants,
          hiddenTestCases: body.hiddenTestCases,
          bufferVisibility: body.bufferVisibility,
        },
        createdAt: new Date().toISOString(),
      };
      MOCK_ROOMS.set(room.code, room);
      return ok(room, 201);
    },
  },
  {
    method: 'GET',
    pattern: /^\/rooms\/([^/]+)$/,
    handler: (req, [code]) => {
      const room = MOCK_ROOMS.get(decodeURIComponent(code).toUpperCase());
      return room ? ok(toPreview(room)) : fail(req, 404, `No room found with code ${code}`, 'Not Found');
    },
  },
  {
    method: 'POST',
    pattern: /^\/rooms\/([^/]+)\/join$/,
    handler: (req, [code]) => {
      const room = MOCK_ROOMS.get(decodeURIComponent(code).toUpperCase());
      if (!room) {
        return fail(req, 404, `No room found with code ${code}`, 'Not Found');
      }
      if (room.status !== 'LOBBY') {
        return fail(req, 409, 'This session has already started', 'Conflict');
      }
      const alreadyIn = room.participants.some(p => p.id === MOCK_CURRENT_USER.id);
      if (!alreadyIn && room.participants.length >= room.settings.maxParticipants) {
        return fail(req, 409, 'This room is full', 'Conflict');
      }
      if (!alreadyIn) {
        room.participants.push({ id: MOCK_CURRENT_USER.id, username: MOCK_CURRENT_USER.username, isHost: false });
      }
      return ok(room);
    },
  },
];

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = inject(API_BASE_URL);
  if (!USE_MOCK_API || !req.url.startsWith(baseUrl)) {
    return next(req);
  }

  const path = req.url.slice(baseUrl.length);
  for (const route of routes) {
    const match = route.method === req.method ? route.pattern.exec(path) : null;
    if (match) {
      return route.handler(req, match.slice(1));
    }
  }
  return next(req);
};

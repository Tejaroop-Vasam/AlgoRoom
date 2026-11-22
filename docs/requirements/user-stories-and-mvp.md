# Product Requirements & MVP User Stories

## Overview

The platform is a real-time collaborative and competitive Data Structures & Algorithms (DSA) practice environment. It delivers two foundational experiences centered around a shared problem-solving session:

- **🏁 Race Mode**: Compete while solving independently.
- **🤝 Co-op Mode**: Collaborate while solving together.

---

## The Central Product Loop

```
                    CREATE / JOIN ROOM
                            │
                 ┌──────────┴──────────┐
                 │                     │
              🏁 RACE                🤝 CO-OP
                 │                     │
          Individual editor      Shared editor
                 │                     │
             Solve alone          Discuss + solve
                 │                     │
             Submit                 Run
                 │                     │
                 └──────────┬──────────┘
                            │
                      Session Results
```

### Core Product Distinction
- **Race Mode**: Participants work independently in their own isolated code editors against the clock, receiving real-time broadcasts of opponents' progress, test-run statuses, and solves.
- **Co-op Mode**: Participants share a single synchronized code editor, collaborate on the solution, run shared test suites, and converse via real-time room chat.

---

## MVP User Stories

### Epic 1 — User & Session

| ID | User Story | Priority |
| :--- | :--- | :--- |
| **US-01** | As a user, I want to enter a username so that other participants can identify me in a room. | **Must** |
| **US-02** | As a user, I want to create a room so that I can invite others to practice DSA with me. | **Must** |
| **US-03** | As a user, I want to join a room using a room code/link so that I can participate with my friends. | **Must** |
| **US-04** | As a user, I want to see the participants currently in my room so that I know who is participating. | **Must** |

---

### Epic 2 — Problem Selection

| ID | User Story | Priority |
| :--- | :--- | :--- |
| **US-05** | As a room creator, I want to select a DSA problem for the room so that everyone works on the same problem. | **Must** |
| **US-06** | As a user, I want to see the problem statement, constraints, examples, and difficulty so that I understand what I need to solve. | **Must** |
| **US-07** | As a room creator, I want to select multiple problems for a race so that participants can solve a set of problems. | Should |

---

### Epic 3 — 🏁 Race Mode

#### Starting a Race
| ID | User Story | Priority |
| :--- | :--- | :--- |
| **US-08** | As a room creator, I want to select Race Mode so that everyone solves independently. | **Must** |
| **US-09** | As a room creator, I want to start the race when everyone is ready so that participants begin at the same time. | **Must** |
| **US-10** | As a participant, I want to see a countdown before the race starts so that everyone gets an equal start. | **Must** |
| **US-11** | As a participant, I want my own code editor so that I can solve the problem independently. | **Must** |

#### During the Race
| ID | User Story | Priority |
| :--- | :--- | :--- |
| **US-12** | As a participant, I want to run my code against test cases so that I can check my solution. | **Must** |
| **US-13** | As a participant, I want to submit my solution so that the system can determine whether I solved the problem. | **Must** |
| **US-14** | As a participant, I want to see other participants' solving status so that I know how the race is progressing. | **Must** |
| **US-15** | As a participant, I want to see how many problems each participant has solved so that I can track the group's progress. | **Must** |
| **US-16** | As a participant, I want to see when someone solves a problem so that I receive real-time race updates. | **Must** |
| **US-17** | As a participant, I want to see the elapsed/remaining time so that I know how much time is left. | **Must** |

#### Race Completion
| ID | User Story | Priority |
| :--- | :--- | :--- |
| **US-18** | As a participant, I want to see the final race results so that I know how everyone performed. | **Must** |
| **US-19** | As a participant, I want to see my solve time so that I know how long I took. | Should |
| **US-20** | As a participant, I want to see which problems I solved and which I didn't so that I can review my performance. | Should |

---

### Epic 4 — 🤝 Co-op Mode

#### Creating the Session
| ID | User Story | Priority |
| :--- | :--- | :--- |
| **US-21** | As a room creator, I want to select Co-op Mode so that participants can solve a problem together. | **Must** |
| **US-22** | As a participant, I want to see the same problem statement as everyone else so that we can discuss it together. | **Must** |

#### Collaborative Editor
| ID | User Story | Priority |
| :--- | :--- | :--- |
| **US-23** | As a participant, I want to edit a shared code editor so that everyone can contribute to the solution. | **Must** |
| **US-24** | As a participant, I want to see other participants' changes in real time so that we can collaborate without manually sharing code. | **Must** |
| **US-25** | As a participant, I want to see who is currently editing the code so that I know who is making changes. | Should |
| **US-26** | As a participant, I want to run the shared code so that the team can test the current solution. | **Must** |
| **US-27** | As a participant, I want to add test cases so that we can check the solution against different scenarios. | Should |

#### Discussion
| ID | User Story | Priority |
| :--- | :--- | :--- |
| **US-28** | As a participant, I want to chat with other participants so that we can discuss the problem and solution. | **Must** |
| **US-29** | As a participant, I want to see who sent each message so that I can follow the discussion. | **Must** |
| **US-30** | As a participant, I want the chat and code editor to remain synchronized so that I can discuss changes while working on the solution. | Should |

---

### Epic 5 — 👥 Room Presence & Progress

| ID | User Story | Priority |
| :--- | :--- | :--- |
| **US-31** | As a participant, I want to see who is online so that I know who is currently participating. | **Must** |
| **US-32** | As a participant, I want to see what problem each participant is currently solving so that I can see their progress. | **Must** |
| **US-33** | As a participant, I want to see when another participant starts solving a problem so that I can follow their activity. | Should |
| **US-34** | As a participant, I want to see when another participant solves a problem so that the room feels live and interactive. | **Must** |
| **US-35** | As a participant, I want to see the group's overall progress so that I know how much of the challenge has been completed. | Should |

---

### Epic 6 — Problem History

| ID | User Story | Priority |
| :--- | :--- | :--- |
| **US-36** | As a user, I want to see the problems I solved during a session so that I can review my practice. | Should |
| **US-37** | As a user, I want to see my total solved count in a session so that I can track my progress. | Should |

---

## MVP Scope Definition

### 🟢 Must Have Scope (Core 20 Stories)
The MVP focus is strictly constrained to the critical path that proves the value proposition:

1. **Room & User Session**:
   - `US-01`: Enter username
   - `US-02`: Create room
   - `US-03`: Join room by code/link
   - `US-04`: Live participant roster
2. **Problems**:
   - `US-05`: Select DSA problem
   - `US-06`: View problem description, examples, and constraints
3. **Race Experience**:
   - `US-08`: Mode selection (Race Mode)
   - `US-09`: Start race synchronized
   - `US-10`: Synchronized 3-2-1 countdown
   - `US-11`: Dedicated individual editor buffer
   - `US-12`: Run against sample test cases
   - `US-13`: Submit solution against full validation test cases
   - `US-14`: Real-time participant status indicators (coding, testing, solved)
   - `US-15`: Real-time solved count leaderboard
   - `US-16`: Instant toast / broadcast on opponent solve
   - `US-17`: Synchronized race timer (elapsed / countdown)
   - `US-18`: Final race results board
4. **Co-op Experience**:
   - `US-21`: Mode selection (Co-op Mode)
   - `US-23`: Shared collaborative code editor
   - `US-24`: Real-time keystroke/change propagation
   - `US-26`: Execute shared code against test suite
   - `US-28`: In-room real-time team chat

### 🟡 Later (Post-MVP Roadmap)
The following features are deliberately postponed to maintain high delivery speed:
- User authentication & persistent profiles
- Friends list and direct invites
- Daily streaks and global ranking boards
- In-depth solution diff comparison post-race
- Dynamic custom test-case sharing
- Multi-cursor presence visualization
- Long-term historical performance analytics
- Gamification badges and achievements
- Session replay playback

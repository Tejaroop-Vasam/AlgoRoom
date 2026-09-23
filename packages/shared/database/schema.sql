CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
DO $$ 
BEGIN 
    CREATE EXTENSION IF NOT EXISTS "vector"; 
EXCEPTION WHEN OTHERS THEN 
    RAISE NOTICE 'pgvector extension not installed or not supported in this environment; vector columns will require pgvector when enabled.';
END $$;

DO $$ BEGIN
    CREATE TYPE scheme_level_enum AS ENUM ('central', 'state', 'centrally_sponsored', 'local_body');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE gender_enum AS ENUM ('all', 'male', 'female', 'transgender');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE caste_category_enum AS ENUM ('general', 'obc', 'sc', 'st', 'ews', 'pvtg', 'all');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE marital_status_enum AS ENUM ('all', 'single', 'married', 'widowed', 'divorced');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE area_type_enum AS ENUM ('all', 'rural', 'urban', 'semi_urban');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE benefit_type_enum AS ENUM (
        'direct_benefit_transfer', 
        'scholarship', 
        'subsidy', 
        'loan', 
        'insurance', 
        'training', 
        'in_kind', 
        'pension', 
        'composite'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE application_mode_enum AS ENUM ('online', 'offline', 'both');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE scheme_status_enum AS ENUM ('draft', 'published', 'archived', 'deprecated');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE application_status_enum AS ENUM (
        'bookmarked', 
        'eligible', 
        'in_progress', 
        'submitted', 
        'under_review', 
        'approved', 
        'rejected', 
        'disbursed', 
        'expired'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE notification_channel_enum AS ENUM ('in_app', 'email', 'whatsapp', 'sms');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS states (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    iso_code VARCHAR(10) UNIQUE,
    lgd_code INTEGER UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS districts (
    id SERIAL PRIMARY KEY,
    state_code VARCHAR(10) NOT NULL REFERENCES states(code) ON DELETE RESTRICT,
    name VARCHAR(150) NOT NULL,
    lgd_code INTEGER UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_districts_state_name UNIQUE (state_code, name)
);

CREATE TABLE IF NOT EXISTS ministries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50),
    level scheme_level_enum NOT NULL DEFAULT 'central',
    state_code VARCHAR(10) REFERENCES states(code) ON DELETE SET NULL,
    website_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ministry_id UUID NOT NULL REFERENCES ministries(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    website_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    icon_name VARCHAR(100),
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS document_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    issuing_authority VARCHAR(200),
    description TEXT,
    is_identity_proof BOOLEAN DEFAULT FALSE,
    is_income_proof BOOLEAN DEFAULT FALSE,
    is_address_proof BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255),
    full_name VARCHAR(200) NOT NULL,
    role VARCHAR(50) DEFAULT 'citizen',
    preferred_language VARCHAR(10) DEFAULT 'en',
    is_active BOOLEAN DEFAULT TRUE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    relationship VARCHAR(50) NOT NULL DEFAULT 'self',
    full_name VARCHAR(200) NOT NULL,
    date_of_birth DATE,
    gender gender_enum NOT NULL DEFAULT 'all',
    caste_category caste_category_enum NOT NULL DEFAULT 'general',
    marital_status marital_status_enum NOT NULL DEFAULT 'single',

    annual_household_income NUMERIC(14, 2),
    personal_annual_income NUMERIC(14, 2),
    is_bpl BOOLEAN DEFAULT FALSE,
    ration_card_type VARCHAR(50),
    is_minority BOOLEAN DEFAULT FALSE,
    minority_religion VARCHAR(100),

    state_code VARCHAR(10) REFERENCES states(code) ON DELETE SET NULL,
    district_id INTEGER REFERENCES districts(id) ON DELETE SET NULL,
    pin_code VARCHAR(10),
    area_type area_type_enum DEFAULT 'all',

    occupation_type VARCHAR(100),
    occupation_details VARCHAR(255),
    education_level VARCHAR(100),
    is_student BOOLEAN DEFAULT FALSE,
    school_college_name VARCHAR(255),

    is_differently_abled BOOLEAN DEFAULT FALSE,
    disability_percentage NUMERIC(5, 2),
    disability_type VARCHAR(100),
    land_holding_acres NUMERIC(8, 2) DEFAULT 0.00,
    is_landless_laborer BOOLEAN DEFAULT FALSE,

    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    document_type_id UUID NOT NULL REFERENCES document_types(id) ON DELETE RESTRICT,
    document_number_masked VARCHAR(50),
    document_number_hash VARCHAR(64),
    file_storage_path TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    issued_date DATE,
    expiry_date DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_profile_document_type UNIQUE (profile_id, document_type_id)
);

CREATE TABLE IF NOT EXISTS schemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    code VARCHAR(100) UNIQUE,
    title VARCHAR(300) NOT NULL,
    short_description TEXT NOT NULL,
    detailed_description TEXT,
    objective TEXT,

    scheme_level scheme_level_enum NOT NULL DEFAULT 'central',
    state_code VARCHAR(10) REFERENCES states(code) ON DELETE SET NULL,
    ministry_id UUID REFERENCES ministries(id) ON DELETE SET NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,

    benefit_type benefit_type_enum NOT NULL,
    benefit_summary TEXT NOT NULL,
    max_benefit_amount NUMERIC(14, 2),

    official_portal_url TEXT NOT NULL,
    application_portal_url TEXT,
    guidelines_pdf_url TEXT,
    application_mode application_mode_enum DEFAULT 'online',

    status scheme_status_enum NOT NULL DEFAULT 'published',
    is_perpetual BOOLEAN DEFAULT FALSE,
    application_start_date DATE,
    application_deadline DATE,
    is_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMPTZ,
    current_version INTEGER DEFAULT 1,

    search_vector tsvector,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scheme_eligibility_criteria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,

    min_age INTEGER,
    max_age INTEGER,
    allowed_genders gender_enum[] DEFAULT '{all}',
    allowed_castes caste_category_enum[] DEFAULT '{all}',
    max_annual_income NUMERIC(14, 2),
    allowed_area_types area_type_enum[] DEFAULT '{all}',
    allowed_states VARCHAR(10)[],
    allowed_occupations VARCHAR(100)[],
    allowed_education_levels VARCHAR(100)[],

    requires_bpl BOOLEAN DEFAULT FALSE,
    requires_minority BOOLEAN DEFAULT FALSE,
    requires_differently_abled BOOLEAN DEFAULT FALSE,
    min_disability_percentage NUMERIC(5, 2),
    max_land_holding_acres NUMERIC(8, 2),

    complex_rules_json JSONB DEFAULT '{}'::jsonb,

    criteria_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_scheme_criteria UNIQUE (scheme_id)
);

CREATE TABLE IF NOT EXISTS scheme_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
    document_type_id UUID NOT NULL REFERENCES document_types(id) ON DELETE RESTRICT,
    is_mandatory BOOLEAN DEFAULT TRUE,
    purpose TEXT,
    alternative_document_type_ids UUID[],
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_scheme_document UNIQUE (scheme_id, document_type_id)
);

CREATE TABLE IF NOT EXISTS scheme_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL,
    title VARCHAR(300) NOT NULL,
    short_description TEXT NOT NULL,
    detailed_description TEXT,
    benefit_summary TEXT,
    eligibility_summary TEXT,
    application_process TEXT,
    search_vector tsvector,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_scheme_language UNIQUE (scheme_id, language_code)
);

CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    base_url TEXT NOT NULL,
    level scheme_level_enum NOT NULL,
    state_code VARCHAR(10) REFERENCES states(code) ON DELETE SET NULL,
    scraper_module_name VARCHAR(100) NOT NULL,
    crawl_frequency_hours INTEGER DEFAULT 24,
    is_active BOOLEAN DEFAULT TRUE,
    last_crawled_at TIMESTAMPTZ,
    last_status VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crawl_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    finished_at TIMESTAMPTZ,
    schemes_discovered INTEGER DEFAULT 0,
    schemes_updated INTEGER DEFAULT 0,
    schemes_failed INTEGER DEFAULT 0,
    status VARCHAR(50) NOT NULL,
    error_message TEXT,
    log_file_url TEXT
);

CREATE TABLE IF NOT EXISTS raw_scheme_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
    crawl_log_id UUID REFERENCES crawl_logs(id) ON DELETE SET NULL,
    source_url TEXT NOT NULL,
    source_identifier VARCHAR(255),
    raw_content TEXT NOT NULL,
    content_hash VARCHAR(64) NOT NULL,
    parsed_scheme_id UUID REFERENCES schemes(id) ON DELETE SET NULL,
    is_processed BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scheme_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    scheme_snapshot_json JSONB NOT NULL,
    change_summary TEXT,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_scheme_version UNIQUE (scheme_id, version_number)
);

CREATE TABLE IF NOT EXISTS scheme_change_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
    field_name VARCHAR(100) NOT NULL,
    old_value TEXT,
    new_value TEXT,
    detected_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    notified_subscribers BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS scheme_embeddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
    model_name VARCHAR(100) NOT NULL DEFAULT 'text-embedding-3-small',
    embedding vector(1536),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_scheme_model UNIQUE (scheme_id, model_name)
);

CREATE TABLE IF NOT EXISTS user_scheme_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,

    match_score NUMERIC(5, 2) NOT NULL,
    is_fully_eligible BOOLEAN DEFAULT FALSE,

    matched_criteria JSONB DEFAULT '[]'::jsonb,
    unmatched_criteria JSONB DEFAULT '[]'::jsonb,
    missing_user_fields JSONB DEFAULT '[]'::jsonb,

    computed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_profile_scheme_match UNIQUE (profile_id, scheme_id)
);

CREATE TABLE IF NOT EXISTS user_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    scheme_id UUID NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,

    status application_status_enum NOT NULL DEFAULT 'bookmarked',
    application_reference_number VARCHAR(100),
    official_application_date DATE,
    disbursed_amount NUMERIC(14, 2),
    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_profile_applied_scheme UNIQUE (profile_id, scheme_id)
);

CREATE TABLE IF NOT EXISTS application_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES user_applications(id) ON DELETE CASCADE,
    previous_status application_status_enum,
    new_status application_status_enum NOT NULL,
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    scheme_id UUID REFERENCES schemes(id) ON DELETE SET NULL,
    channel notification_channel_enum NOT NULL DEFAULT 'in_app',
    notification_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    action_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    scheduled_for TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_notification_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    email_enabled BOOLEAN DEFAULT TRUE,
    whatsapp_enabled BOOLEAN DEFAULT TRUE,
    sms_enabled BOOLEAN DEFAULT FALSE,
    in_app_enabled BOOLEAN DEFAULT TRUE,
    deadline_remind_days_before INTEGER[] DEFAULT '{7, 3, 1}',
    notify_on_new_match BOOLEAN DEFAULT TRUE,
    notify_on_scheme_update BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_user_documents_updated_at BEFORE UPDATE ON user_documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_schemes_updated_at BEFORE UPDATE ON schemes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_scheme_eligibility_criteria_updated_at BEFORE UPDATE ON scheme_eligibility_criteria FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_scheme_translations_updated_at BEFORE UPDATE ON scheme_translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_user_applications_updated_at BEFORE UPDATE ON user_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_user_notification_preferences_updated_at BEFORE UPDATE ON user_notification_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION schemes_search_vector_update() RETURNS trigger AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.short_description, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.benefit_summary, '')), 'C') ||
        setweight(to_tsvector('english', COALESCE(NEW.detailed_description, '')), 'D');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_schemes_search_vector_update
BEFORE INSERT OR UPDATE OF title, short_description, detailed_description, benefit_summary
ON schemes
FOR EACH ROW EXECUTE FUNCTION schemes_search_vector_update();

CREATE INDEX IF NOT EXISTS idx_schemes_search_vector ON schemes USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_schemes_title_trgm ON schemes USING gin(title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_scheme_translations_search ON scheme_translations USING gin(search_vector);

CREATE INDEX IF NOT EXISTS idx_schemes_level_state ON schemes(scheme_level, state_code) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_schemes_category ON schemes(category_id) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_schemes_deadline ON schemes(application_deadline) WHERE status = 'published' AND is_perpetual = FALSE;
CREATE INDEX IF NOT EXISTS idx_schemes_status_verified ON schemes(status, is_verified);

CREATE INDEX IF NOT EXISTS idx_criteria_age ON scheme_eligibility_criteria(min_age, max_age);
CREATE INDEX IF NOT EXISTS idx_criteria_income ON scheme_eligibility_criteria(max_annual_income);
CREATE INDEX IF NOT EXISTS idx_criteria_complex_rules ON scheme_eligibility_criteria USING gin(complex_rules_json);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_matching ON user_profiles(state_code, caste_category, annual_household_income);
CREATE INDEX IF NOT EXISTS idx_user_scheme_matches_lookup ON user_scheme_matches(profile_id, match_score DESC);
CREATE INDEX IF NOT EXISTS idx_user_scheme_matches_user ON user_scheme_matches(user_id, match_score DESC);

CREATE INDEX IF NOT EXISTS idx_snapshots_source_hash ON raw_scheme_snapshots(source_id, content_hash);
CREATE INDEX IF NOT EXISTS idx_snapshots_unprocessed ON raw_scheme_snapshots(is_processed) WHERE is_processed = FALSE;
CREATE INDEX IF NOT EXISTS idx_change_logs_scheme_date ON scheme_change_logs(scheme_id, detected_at DESC);

CREATE INDEX IF NOT EXISTS idx_applications_user_status ON user_applications(user_id, status);
CREATE INDEX IF NOT EXISTS idx_applications_profile ON user_applications(profile_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX IF NOT EXISTS idx_notifications_scheduled ON notifications(scheduled_for) WHERE sent_at IS NULL;

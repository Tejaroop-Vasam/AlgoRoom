INSERT INTO states (code, name, iso_code, lgd_code) VALUES
('IN-AN', 'Andaman and Nicobar Islands', 'AN', 35),
('IN-AP', 'Andhra Pradesh', 'AP', 28),
('IN-AR', 'Arunachal Pradesh', 'AR', 12),
('IN-AS', 'Assam', 'AS', 18),
('IN-BR', 'Bihar', 'BR', 10),
('IN-CH', 'Chandigarh', 'CH', 4),
('IN-CT', 'Chhattisgarh', 'CG', 22),
('IN-DH', 'Dadra and Nagar Haveli and Daman and Diu', 'DN', 26),
('IN-DL', 'Delhi', 'DL', 7),
('IN-GA', 'Goa', 'GA', 30),
('IN-GJ', 'Gujarat', 'GJ', 24),
('IN-HR', 'Haryana', 'HR', 6),
('IN-HP', 'Himachal Pradesh', 'HP', 2),
('IN-JK', 'Jammu and Kashmir', 'JK', 1),
('IN-JH', 'Jharkhand', 'JH', 20),
('IN-KA', 'Karnataka', 'KA', 29),
('IN-KL', 'Kerala', 'KL', 32),
('IN-LA', 'Ladakh', 'LA', 37),
('IN-LD', 'Lakshadweep', 'LD', 31),
('IN-MP', 'Madhya Pradesh', 'MP', 23),
('IN-MH', 'Maharashtra', 'MH', 27),
('IN-MN', 'Manipur', 'MN', 14),
('IN-ML', 'Meghalaya', 'ML', 17),
('IN-MZ', 'Mizoram', 'MZ', 15),
('IN-NL', 'Nagaland', 'NL', 13),
('IN-OR', 'Odisha', 'OD', 21),
('IN-PY', 'Puducherry', 'PY', 34),
('IN-PB', 'Punjab', 'PB', 3),
('IN-RJ', 'Rajasthan', 'RJ', 8),
('IN-SK', 'Sikkim', 'SK', 11),
('IN-TN', 'Tamil Nadu', 'TN', 33),
('IN-TG', 'Telangana', 'TS', 36),
('IN-TR', 'Tripura', 'TR', 16),
('IN-UP', 'Uttar Pradesh', 'UP', 9),
('IN-UT', 'Uttarakhand', 'UK', 5),
('IN-WB', 'West Bengal', 'WB', 19)
ON CONFLICT (code) DO NOTHING;

INSERT INTO categories (id, slug, name, description, icon_name, display_order) VALUES
('c0000000-0000-0000-0000-000000000001', 'education-scholarships', 'Education & Scholarships', 'Pre-matric, post-matric, higher education fellowships, and tuition waivers', 'academic-cap', 1),
('c0000000-0000-0000-0000-000000000002', 'agriculture-farming', 'Agriculture, Rural & Farming', 'Subsidies, crop insurance, equipment grants, fertilizer assistance, and PM-KISAN', 'sprout', 2),
('c0000000-0000-0000-0000-000000000003', 'healthcare-wellness', 'Health & Wellness', 'Ayushman Bharat, medical insurance, maternal nutrition, and critical illness funds', 'heart-pulse', 3),
('c0000000-0000-0000-0000-000000000004', 'women-child', 'Women and Child Development', 'Maternity support, girl child protection, self-help groups (SHG), and widow welfare', 'users', 4),
('c0000000-0000-0000-0000-000000000005', 'business-entrepreneurship', 'Business & Entrepreneurship', 'MUDRA loans, PMEGP, startup grants, MSME collateral-free credit, and artisan credit', 'briefcase', 5),
('c0000000-0000-0000-0000-000000000006', 'social-security-pension', 'Social Security & Pension', 'Old age pensions, disability allowance, unorganized worker safety nets, and Atal Pension', 'shield-check', 6),
('c0000000-0000-0000-0000-000000000007', 'housing-shelter', 'Housing & Urban Development', 'PMAY Gramin & Urban, sanitation grants, tap water connections, and rural electrification', 'home', 7),
('c0000000-0000-0000-0000-000000000008', 'skills-employment', 'Skills & Employment', 'PMKVY, apprenticeship training, vocational programs, and employment exchange schemes', 'lightbulb', 8)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO document_types (code, name, issuing_authority, description, is_identity_proof, is_income_proof, is_address_proof) VALUES
('AADHAAR', 'Aadhaar Card', 'UIDAI', 'Unique 12-digit Indian biometric identity card', TRUE, FALSE, TRUE),
('PAN_CARD', 'Permanent Account Number (PAN) Card', 'Income Tax Department', '10-digit alphanumeric tax identifier', TRUE, FALSE, FALSE),
('INCOME_CERT', 'Income Certificate', 'Revenue Dept / Tehsildar', 'Official annual household income verification certificate', FALSE, TRUE, FALSE),
('CASTE_CERT', 'Caste / Community Certificate', 'Revenue Dept / SDO', 'OBC, SC, ST or EWS quota eligibility certificate', TRUE, FALSE, FALSE),
('DOMICILE_CERT', 'Domicile / Permanent Resident Certificate', 'State Revenue Dept', 'Proof of state residency/domicile', FALSE, FALSE, TRUE),
('RATION_CARD', 'Ration Card (BPL / AAY / PHH)', 'Food & Civil Supplies Dept', 'Subsidized food grain ration card and household roster', TRUE, TRUE, TRUE),
('LAND_RECORD', 'Land Records (7/12 Extract / Patta / Pahani / RoR)', 'State Land Revenue Authority', 'Proof of agricultural land ownership and acreage', FALSE, FALSE, FALSE),
('DISABILITY_CERT', 'Disability Certificate (UDID)', 'Dept of Empowerment of Persons with Disabilities', 'Unique Disability ID (UDID) card indicating disability percentage', TRUE, FALSE, FALSE),
('MARKSHEET_10TH', '10th Standard / Matriculation Marksheet', 'State Board / CBSE / ICSE', 'Proof of age and secondary school completion', TRUE, FALSE, FALSE),
('MARKSHEET_12TH', '12th Standard / Higher Secondary Marksheet', 'State Board / CBSE / ISC', 'Senior secondary completion marksheet', FALSE, FALSE, FALSE),
('COLLEGE_ID', 'Bonafide Student Certificate / College ID', 'Educational Institution', 'Proof of active student enrollment in accredited course', TRUE, FALSE, FALSE),
('BANK_PASSBOOK', 'Bank Passbook / Cancelled Cheque', 'Scheduled Commercial Bank', 'Proof of active bank account and IFSC for Direct Benefit Transfer (DBT)', FALSE, FALSE, TRUE),
('E_SHRAM', 'e-Shram Card', 'Ministry of Labour & Employment', 'National database card for unorganized sector workers', TRUE, FALSE, FALSE),
('KISAN_CREDIT_CARD', 'Kisan Credit Card (KCC)', 'NABARD / Commercial Banks', 'Credit card for agricultural credit and subsidies', FALSE, FALSE, FALSE)
ON CONFLICT (code) DO NOTHING;

INSERT INTO ministries (id, name, short_name, level, website_url) VALUES
('m0000000-0000-0000-0000-000000000001', 'Ministry of Agriculture & Farmers Welfare', 'MoA&FW', 'central', 'https://agricoop.nic.in'),
('m0000000-0000-0000-0000-000000000002', 'Ministry of Education', 'MoE', 'central', 'https://www.education.gov.in'),
('m0000000-0000-0000-0000-000000000003', 'Ministry of Health and Family Welfare', 'MoHFW', 'central', 'https://mohfw.gov.in'),
('m0000000-0000-0000-0000-000000000004', 'Ministry of Social Justice and Empowerment', 'MoSJE', 'central', 'https://socialjustice.gov.in'),
('m0000000-0000-0000-0000-000000000005', 'Ministry of Micro, Small and Medium Enterprises', 'MoMSME', 'central', 'https://msme.gov.in'),
('m0000000-0000-0000-0000-000000000006', 'Ministry of Women and Child Development', 'MoWCD', 'central', 'https://wcd.nic.in'),
('m0000000-0000-0000-0000-000000000007', 'Ministry of Rural Development', 'MoRD', 'central', 'https://rural.nic.in')
ON CONFLICT (id) DO NOTHING;

INSERT INTO sources (id, name, base_url, level, scraper_module_name, crawl_frequency_hours) VALUES
('s0000000-0000-0000-0000-000000000001', 'MyScheme Official Portal', 'https://www.myscheme.gov.in', 'central', 'scrapers.myscheme_spider', 24),
('s0000000-0000-0000-0000-000000000002', 'National Scholarship Portal (NSP)', 'https://scholarships.gov.in', 'central', 'scrapers.nsp_spider', 12),
('s0000000-0000-0000-0000-000000000003', 'PM-KISAN Samman Nidhi Portal', 'https://pmkisan.gov.in', 'central', 'scrapers.pmkisan_spider', 48),
('s0000000-0000-0000-0000-000000000004', 'Karnataka Seva Sindhu', 'https://sevasindhu.karnataka.gov.in', 'state', 'scrapers.karnataka_sevasindhu_spider', 24)
ON CONFLICT (id) DO NOTHING;

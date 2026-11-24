create table public.applications (
  id          bigint generated always as identity primary key,  
  company     text not null,                                     
  role        text not null,                                    
  status      text not null default 'applied'
              check (status in ('applied', 'interview', 'offer', 'rejected')),
  applied_on  date not null default current_date,               
  notes       text,                                           
  created_at  timestamptz not null default now()                 
);

alter table public.applications enable row level security;

revoke all on public.applications from anon, authenticated;
grant select, insert, update, delete on public.applications to service_role;

-- SAMPLE ROWS so GET has something to show.
insert into public.applications (company, role, status, applied_on, notes) values
  ('Google',      'Software Engineer, New Grad',        'applied',   '2026-11-03', 'Applied through careers site'),
  ('Spotify',     'Backend Engineer',                    'interview', '2026-10-21', 'Technical screen Dec 2'),
  ('Capital One', 'Technology Development Program',      'interview', '2026-10-08', 'Online assessment done, waiting on Power Day'),
  ('Microsoft',   'Software Engineer',                   'rejected',  '2026-09-30', null),
  ('Stripe',      'Software Engineer, New Grad',         'applied',   '2026-11-12', 'Referral from a CSI alum'),
  ('Datadog',     'Software Engineer, Early Career',     'offer',     '2026-09-22', 'Offer deadline Dec 5'),
  ('Duolingo',    'Associate Product Manager',           'applied',   '2026-11-18', null),
  ('Etsy',        'Frontend Engineer',                   'rejected',  '2026-10-14', 'Rejected after final round');

select * from public.applications order by id;
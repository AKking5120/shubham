-- Run once in Supabase SQL Editor if production DB already has seed services (6 rows).
insert into public.services (
  id,
  slug,
  name,
  short_description,
  description,
  image,
  enabled,
  sort_order
) values (
  'svc-7',
  'bulk-copy-printout',
  'Bulk Copy / Printout',
  'High-volume photocopy, document printing and printouts for study and office work.',
  'Bulk copying and printout services for students, offices and businesses. Black & white and colour options, A4 and other sizes, binding and finishing available on request.',
  '/services/bulk-copy-printout.jpg',
  true,
  7
)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  short_description = excluded.short_description,
  description = excluded.description,
  image = excluded.image,
  enabled = excluded.enabled,
  sort_order = excluded.sort_order;

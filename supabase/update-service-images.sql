-- Update service preview images after deploying /public/services/*.jpg
-- Image paths are relative site URLs; admin can paste full URL if needed.

update public.services set image = '/services/bill-book.jpg' where id = 'svc-1';
update public.services set image = '/services/challan-book.jpg' where id = 'svc-2';
update public.services set image = '/services/letter-pad.jpg' where id = 'svc-3';
update public.services set image = '/services/visiting-card-tag.jpg' where id = 'svc-4';
update public.services set image = '/services/sticker-banner.jpg' where id = 'svc-5';
update public.services set image = '/services/wedding-card.jpg' where id = 'svc-6';
update public.services set image = '/services/bulk-copy-printout.jpg' where id = 'svc-7';

update public.products set image = '/services/bill-book.jpg' where id = 'prd-1';
update public.products set image = '/services/letter-pad.jpg' where id = 'prd-2';
update public.products set image = '/services/visiting-card-tag.jpg' where id = 'prd-3';
update public.products set image = '/services/sticker-banner.jpg' where id = 'prd-4';
update public.products set image = '/services/shop-banner.jpg' where id = 'prd-5';
update public.products set image = '/services/wedding-card.jpg' where id = 'prd-6';
update public.products set image = '/services/challan-book.jpg' where id = 'prd-7';
update public.products set image = '/services/shop-banner.jpg' where id = 'prd-8';
update public.products set image = '/services/sticker-banner.jpg' where id = 'prd-9';

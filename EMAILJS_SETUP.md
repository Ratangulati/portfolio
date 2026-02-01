# EmailJS – Fix "Recipient's address is empty"

This error means your **Email Template** in EmailJS does not have a **To Email** set.

## Fix

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/) → **Email Templates**.
2. Open the template you use for the contact form (the one whose ID is in `VITE_EMAILJS_TEMPLATE_ID`).
3. In the template editor, find **To Email** (sometimes under "Settings" or the template content).
4. Set **To Email** to the address where you want to receive contact form messages (e.g. `you@example.com`).
5. If your template uses variables, you can set **To Email** to a fixed value like `your-real-email@gmail.com` — do **not** leave it blank.
6. Save the template.

After saving, try sending a message from the contact form again.

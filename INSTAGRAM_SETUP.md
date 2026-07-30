# Instagram Integration Setup (Graph API)

This guide walks you through setting up Instagram Graph API for your portfolio site.

## Prerequisites
- An Instagram **Business** or **Creator** account (you'll convert your pottery account)
- A Facebook Page connected to that Instagram account
- A Facebook Developer account

## Step-by-Step Setup

### 1. Convert Instagram to Business/Creator Account

1. Open Instagram app on your phone
2. Go to **Settings > Account > Switch to Professional Account**
3. Choose **"Creator"** or **"Business"**
4. Complete the setup

### 2. Create/Connect Facebook Page

1. Go to [Facebook](https://facebook.com)
2. Create a new Facebook Page for your pottery (or use existing)
3. In Instagram app: **Settings > Account > Linked accounts > Facebook**
4. Connect your Facebook Page to your Instagram account

### 3. Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/apps)
2. Click **"Create App"**
3. Choose **"Other"** as your use case
4. Choose **"Business"** as app type
5. Fill in app details:
   - **App Name**: Your site name (e.g., "My Portfolio")
   - **App Contact Email**: Your email

### 4. Add Facebook Login Product

1. In your app dashboard, click **"Add Product"** in left sidebar
2. Find **"Facebook Login"** and click **"Set Up"**
3. Choose **"Web"** platform
4. Add your site URL: `https://yourdomain.com` (or `http://localhost:3000` for dev)
5. Click **"Save"**

### 5. Configure Facebook Login Settings

1. Go to **Facebook Login > Settings** in left sidebar
2. Under **"Valid OAuth Redirect URIs"**, add:
   - `https://yourdomain.com/`
   - `http://localhost:3000/` (for development)
3. Click **"Save Changes"**

### 6. Get Your Instagram Business Account ID

You need to find your Instagram Business Account ID. Use the Graph API Explorer:

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app from dropdown
3. Click **"Generate Access Token"**
4. Grant permissions: `instagram_basic`, `pages_show_list`, `pages_read_engagement`
5. In the query field, enter: `me/accounts`
6. Click **"Submit"**
7. You'll see your Facebook Page(s). Copy the Page ID
8. Now query: `{PAGE_ID}?fields=instagram_business_account`
9. Copy the `instagram_business_account.id` - this is your Instagram User ID!

### 7. Get Long-Lived Page Access Token

1. In Graph API Explorer, with your app selected
2. Click **"Generate Access Token"** and authorize
3. Copy the short-lived token
4. Use this curl command to exchange for long-lived token:

```bash
curl -i -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN"
```

Replace:
- `YOUR_APP_ID`: Found in **App Settings > Basic**
- `YOUR_APP_SECRET`: Found in **App Settings > Basic** (click "Show")
- `SHORT_LIVED_TOKEN`: The token from step 3

5. This gives you a token valid for 60 days. To get a never-expiring token:

```bash
curl -i -X GET "https://graph.facebook.com/v18.0/{PAGE_ID}?fields=access_token&access_token=LONG_LIVED_TOKEN"
```

The returned token never expires (as long as the app remains active).

### 8. Add Environment Variables

Add these to your `.env.local` file:

```env
INSTAGRAM_ACCESS_TOKEN=YOUR_PAGE_ACCESS_TOKEN
INSTAGRAM_BUSINESS_ACCOUNT_ID=YOUR_IG_BUSINESS_ACCOUNT_ID
```

### 9. Token Refresh (Optional)

Page tokens can be set to never expire, but if you used a 60-day token, refresh it before expiry:

```bash
curl -i -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=CURRENT_TOKEN"
```

## Testing

1. Start your dev server: `npm run dev`
2. Navigate to the "Now" section
3. You should see your pottery posts in a 3x2 grid

## Troubleshooting

**"Missing ACCESS_TOKEN or USER_ID"**
- Make sure `.env.local` has both variables set
- Restart your dev server after adding env vars

**No posts showing**
- Check browser console for errors
- Verify your Instagram account has public posts
- Check that the test user is properly set up

**"Invalid OAuth access token"**
- Token may have expired
- Generate a new long-lived token (see step 6)

## API Limits

Instagram Basic Display API has these limits:
- 200 requests per hour per user
- Posts refresh every hour (cached)
- Up to 25 most recent posts available

## Going to Production

When deploying:
1. Add your production URL to OAuth Redirect URIs in Facebook App
2. Add the same environment variables to your hosting platform
3. The app must use HTTPS (required by Instagram)

## Additional Resources

- [Instagram Basic Display API Docs](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Access Token Refresh Guide](https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens)

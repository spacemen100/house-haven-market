// server/api/auth/github.ts
import express from 'express';
import axios from 'axios';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../config';

const router = express.Router();

router.post('/github', async (req, res) => {
  try {
    const { code } = req.body;

    // Échange le code contre un token d'accès
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Récupère les informations de l'utilisateur
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    // Récupère les emails de l'utilisateur
    const emailsResponse = await axios.get('https://api.github.com/user/emails', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const primaryEmail = emailsResponse.data.find((email: any) => email.primary)?.email;

    res.json({
      email: primaryEmail,
      name: userResponse.data.name,
      avatar: userResponse.data.avatar_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'GitHub authentication failed' });
  }
});

export default router;
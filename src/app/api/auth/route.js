import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo`;
    return Response.redirect(url);
  }

  const { data } = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID, // who you are
      client_secret: process.env.GITHUB_CLIENT_SECRET, // proof
      code: code, // what GitHub gave you
    },
    {
      headers: { Accept: "application/json" },
    },
  );
  console.log(data);
}

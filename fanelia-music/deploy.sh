#!/bin/bash
# Deploy faneliamusic.com to Cloudflare Pages
# Prerequisites: wrangler CLI installed, CLOUDFLARE_API_TOKEN set

export CLOUDFLARE_API_TOKEN="BXFv-T8XEJnYp0C7VsIm108-ZUP_FKVpz2RtiZ_z"
export CLOUDFLARE_ACCOUNT_ID="0f67194ae4aacd1972e0079495a7da6b"

SITE_DIR="/Users/escaflowne/AntiGravity/fanelia-music"

wrangler pages deploy "$SITE_DIR" --project-name=fanelia-music --branch=main --commit-dirty=true

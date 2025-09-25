#!/bin/bash
cd /home/kavia/workspace/code-generation/react-micro-frontend-assets-viewer-36196-36205/remote_assets_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


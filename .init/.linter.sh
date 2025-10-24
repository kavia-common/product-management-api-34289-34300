#!/bin/bash
cd /home/kavia/workspace/code-generation/product-management-api-34289-34300/products_api_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi


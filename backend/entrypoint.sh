#!/bin/sh

echo "Waiting for database..."
sleep 5 

echo "Running migrations..."
npx prisma migrate deploy

echo "Seeding database..."
npx prisma db seed

echo "Starting server..."
npm run dev
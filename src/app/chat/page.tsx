'use client';

import { Suspense } from 'react';

function ChatLoading() {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center">Loading...</div>
    </div>
  );
}

function ChatContent() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Чат</h1>
      <p>Страница чата скоро будет доступна.</p>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatLoading />}>
      <ChatContent />
    </Suspense>
  );
} 
"use client";

import { useEffect, useState } from 'react';

export default function VideoInactivity() {
  const [isInactive, setIsInactive] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchLatestVideo() {
    setIsLoading(true);
    try {
      const response = await fetch(
        'http://localhost:3000/api/media?limit=1&sort=-createdAt&where[mimeType][contains]=video'
      );
      const data = await response.json();
      if (data.docs && data.docs.length > 0) {
        const url = `http://localhost:3000${data.docs[0].url}`;
        console.log('URL do vídeo:', url);
        setVideoUrl(url);
      } else {
        console.log('Nenhum vídeo encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar o último vídeo:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchLatestVideo();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timer);
      setIsInactive(false);
      timer = setTimeout(() => {
        setIsInactive(true);
      }, 30000);
    };

    const events = ['mousemove', 'click', 'keydown', 'scroll'];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(timer);
    };
  }, []);

  // Mover o console.log para fora do JSX
  useEffect(() => {
    console.log('isInactive:', isInactive, 'videoUrl:', videoUrl);
  }, [isInactive, videoUrl]); // Executa sempre que isInactive ou videoUrl mudar

  return (
    <div>
      {isLoading ? (
        <p>Carregando vídeo...</p>
      ) : isInactive && videoUrl ? (
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          style={{ top: '0', width: '100%', height: 'auto',position:'fixed', zIndex: '10000' }}
          onError={(e) => console.error('Erro ao carregar o vídeo:', e)}
        >
          Seu navegador não suporta o elemento de vídeo.
        </video>
      ) : (
        <p  style={{ display: 'none' }}>Aguardando inatividade ou carregamento do vídeo...</p>
      )}
    </div>
  );
}
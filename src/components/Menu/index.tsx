import Link from 'next/link'
import { Home } from 'lucide-react'
import React, { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'

type Post = {
    id: string
    title: string
    slug: string
}

export const Menu: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const pathname = usePathname()

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data.docs)) // Payload CMS retorna `docs`
            .catch((error) => console.error("Erro ao carregar posts:", error))
    }, [])

    // Se estiver em um post específico (/posts/[slug]), exibe apenas o nome do post e botão de voltar
    if (pathname.startsWith('/posts/')) {
        const postSlug = pathname.split('/posts/')[1]
        const post = posts.find(p => p.slug === postSlug)

        return (
            <nav className="flex items-center space-x-2 bg-white p-4">

                <Link href="/" className="bg-[#E69E32] text-white p-3 rounded-full flex items-center flex-shrink-0">
                    <Home size={20} />
                </Link>

                {post ? (
                    <span className="bg-[#E69E32] text-white px-4 py-2 rounded-full text-sm">
                        {post.title}
                    </span>
                ) : (
                    <span className="text-gray-500">Carregando...</span>
                )}
                <button 
                    onClick={() => window.history.back()} 
                    className="bg-[#FFFFFF] text-[#E69E32] px-4 py-2 border border-[#E69E32] rounded-full text-sm"
                >
                    ← Voltar
                </button>
               
            </nav>
        )
    }

    return (
        <nav className="bg-white p-4">
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
                {/* Ícone Home */}
                <Link href="/" className="bg-[#E69E32] text-white p-3 rounded-full flex items-center flex-shrink-0">
                    <Home size={20} />
                </Link>

                {/* Botões Dinâmicos com categorias dos posts */}
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/posts/${post.slug}`}
                        className="bg-[#E69E32] text-white px-4 py-2 rounded-full text-sm flex-shrink-0"
                    >
                        {post.title}
                    </Link>
                ))}
            </div>
        </nav>
    )
}

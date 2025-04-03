"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type Post = {
    id: string
    title: string
    slug: string
    heroImage?: {
        url?: string
        thumbnail?: {
            url?: string
        }
    }
    meta?: {
        description?: string
    }
}

export const FeaturedPosts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data.docs.slice(0, 3))) // Pegando apenas os 3 primeiros posts
            .catch((error) => console.error("Erro ao carregar posts:", error))
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
                {posts.map((post) => {
                    const imageUrl = post.heroImage?.url || post.heroImage?.thumbnail?.url || "/default-image.jpg"

                    return (
                        <Link
                            key={post.id}
                            href={`/posts/${post.slug}`}
                            className="relative block mt-10 rounded-xl overflow-hidden transition-transform transform hover:scale-105"
                        >
                            {/* Imagem de fundo */}
                            <div
                                className="absolute inset-0 bg-cover bg-center rounded-xl h-[350px]"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                            ></div>

                            {/* Sobreposição escura */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>

                            {/* Texto sobre a imagem */}
                            <div className="relative z-10 p-6 text-white flex flex-col justify-start h-[350px]">
                                <h2 className="text-xl font-bold">{post.title}</h2>
                                <p className="text-sm mt-2">{post.meta?.description || "Sem descrição disponível."}</p>
                                {/* <span className="text-xs mt-auto opacity-80">/{post.slug}</span> */}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

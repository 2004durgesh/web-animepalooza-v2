import { NextResponse } from 'next/server'

export async function GET(request) {
    return NextResponse.json({
        intro: "Welcome to the unofficial vidsrc provider: check the provider website @ https://vidsrc.to/ ",
        routes: {
            movie: "/:movieTMDBid",
            show: "/:showTMDBid?s={seasonNumber}&e={episodeNumber}"
        },
        author: "This api is developed and created by AijaZ copied and bought to by Durgesh 🤣✌️"
    }, { status: 200 })
}
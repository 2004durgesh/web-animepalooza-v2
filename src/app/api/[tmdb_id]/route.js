import { NextResponse } from 'next/server'
import { vidsrcBase } from "../src/common.js";
import { load } from "cheerio";
import { getVidsrcMovieSourcesId, getVidsrcShowSourcesId, getVidsrcSourceDetails, getVidsrcSources } from "../src/main.js";
import { encodeId, getFutoken } from "../src/utils.js";
import axios from "axios";
import randomUseragent from 'random-useragent';

export async function GET(request, context) {
  const id = context.params.tmdb_id;
  const season = request.nextUrl.searchParams.get("s");
  const episode = request.nextUrl.searchParams.get("e");
  randomUseragent.getRandom();

  var ip = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255));

  if (!id) {
    return NextResponse.json({
      status: 404,
      return: "Oops media not available"
    }, { status: 404 })

  };
  //
  if (!season && !episode) {
    const sourcesId = await getVidsrcMovieSourcesId(id);
    if (!sourcesId) {
      return NextResponse.json({
        status: 404,
        return: "Oops media not available"
      }, { status: 404 })
    };
    const sources = await getVidsrcSources(sourcesId);

    const vidplay = sources.data.result.find((v) => v.title.toLowerCase() === 'vidplay');

    if (!vidplay) {
      return NextResponse.json({
        status: 404,
        return: "vidplay stream not found for vidsrc"
      }, { status: 404 })

    };

    const vidplayLink = await getVidsrcSourceDetails(vidplay.id);

    const key = await encodeId(vidplayLink.split('/e/')[1].split('?')[0]);
    const data = await getFutoken(key, vidplayLink);

    let subtitles;
    //if(vidplayLink.includes('sub.info='))
    {
      //const subtitleLink = vidplayLink.split('?sub.info=')[1].split('&')[0];
      //const subtitlesFetch = await axios.get(decodeURIComponent(subtitleLink));
      const data = await axios.get(`${vidsrcBase}/embed/movie/${id}`);
      const doc = load(data.data);
      const sourcesCode = doc('a[data-id]').attr('data-id');
      const subtitlesFetch = await axios.get(`https://vidsrc.to/ajax/embed/episode/${sourcesCode}/subtitles`);
      subtitles = await subtitlesFetch.data;
      //console.log(sourcesCode)
    }
    const response = await axios.get(`https://vidplay.online/mediainfo/${data}?${vidplayLink.split('?')[1]}&autostart=true`, {
      params: {
        v: Date.now().toString(),
      },
      headers: {
        "Origin": ip,
        "Referer": vidplayLink,
        "Host": "vidplay.online",
        "User-Agent": randomUseragent
      }
    });

    const result = response.data.result;

    if (!result && typeof result !== 'object') {
      throw new Error('an error occured');
    }

    const source = result.sources?.[0]?.file;
    if (!sourcesId) {
      return NextResponse.json({
        status: 404,
        return: "Oops u reached rate limit of this api"
      }, { status: 404 })
    };

    return NextResponse.json({
      source: source,
      referer: vidplayLink.split('?')[0],
      subtitles: subtitles
    }, { status: 200 })
  }

  if (season && episode) {
    const sourcesId = await getVidsrcShowSourcesId(id, season, episode);
    if (!sourcesId) {
      return NextResponse.json({
        status: 404,
        return: "Oops media not available"
      }, { status: 404 })
    };

    const sources = await getVidsrcSources(sourcesId);

    const vidplay = sources.data.result.find((v) => v.title.toLowerCase() === 'vidplay');

    if (!vidplay) {
      return NextResponse.json({
        status: 404,
        return: "vidplay stream not found for vidsrc"
      }, { status: 404 })

    };

    const vidplayLink = await getVidsrcSourceDetails(vidplay.id);
    
    const key = await encodeId(vidplayLink.split('/e/')[1].split('?')[0]);
    const data = await getFutoken(key, vidplayLink);

    let subtitles;
    //if(vidplayLink.includes('sub.info='))
    {
        //const subtitleLink = vidplayLink.split('?sub.info=')[1].split('&')[0];
        //const subtitlesFetch = await axios.get(decodeURIComponent(subtitleLink));
		const data = await axios.get(`${vidsrcBase}/embed/tv/${id}/${season}/${episode}`);
        const doc = load(data.data);
        const sourcesCode = doc('a[data-id]').attr('data-id');
        const subtitlesFetch = await axios.get(`https://vidsrc.to/ajax/embed/episode/${sourcesCode}/subtitles`);
        subtitles = await subtitlesFetch.data;
    }

    const response = await axios.get(`https://vidplay.online/mediainfo/${data}?${vidplayLink.split('?')[1]}&autostart=true`, {
        params: {
            v: Date.now().toString(),
        },
        headers: {
			"Origin": ip,
            "Referer": vidplayLink,
			"Host": "vidplay.online",
			"User-Agent": randomUseragent
        }
    });

    const result = response.data.result;

    if (!result && typeof result !== 'object') {
        throw new Error('an error occured');
    }

    const source = result.sources?.[0]?.file;
    if (!sourcesId) {
        return NextResponse.json({
            status: 404,
            return: "Oops u reached rate limit of this api"
        }, { status: 404 })
    };

    return NextResponse.json({
        source: source,
        referer: vidplayLink.split('?')[0],
        subtitles: subtitles
    }, { status: 200 })
  }
}
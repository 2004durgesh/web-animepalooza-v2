import { NextResponse } from 'next/server'
import { getVidsrcSourcesId, getVidsrcSourceDetails, getVidsrcSources, getSubtitles } from '../modules/hooks';
import { encodeId, generateRandomIp, generateRandomUserAgent, getFutoken } from '../modules/vidplay/utils';

export async function GET(request, context) {
  const id = context.params.tmdb_id;
  const season = request.nextUrl.searchParams.get("s");
  const episode = request.nextUrl.searchParams.get("e");
  const sourcesId = await getVidsrcSourcesId(id, season, episode);

  if (!sourcesId) {
    NextResponse.json({
      status: 404,
      return: "Oops media not available"
    }, { status: 404 })
    return;
  };

  const sources = await getVidsrcSources(sourcesId);
  const vidplay = sources.result.find((v) => v.title.toLowerCase() === 'vidplay');
  if (!vidplay) NextResponse.json('vidplay stream not found for vidsrc', { status: 404 });

  const vidplayLink = await getVidsrcSourceDetails(vidplay.id);

  const key = await encodeId(vidplayLink.split('/e/')[1].split('?')[0]);
  const data = await getFutoken(key, vidplayLink);

  const subtitles = await getSubtitles(vidplayLink)

  const response = await (await fetch(`https://vidplay.online/mediainfo/${data}?${vidplayLink.split('?')[1]}&autostart=true`, {
    headers: {
      "Origin": generateRandomIp(),
      "Referer": vidplayLink,
      "Host": "vidplay.online",
      "User-Agent": generateRandomUserAgent()
    }
  })).json();

  const result = response.result;

  if (!result && typeof result !== 'object') {
    throw new Error('an error occured');
  }

  const source = result.sources?.[0]?.file;
  if (!source) NextResponse.json({
    status: 404,
    return: "Oops reached rate limit of this api"
  }, { status: 404 })
  return NextResponse.json({
    source: source,
    referer: vidplayLink.split('?')[0],
    subtitles: subtitles
  }, { status: 200 })
}
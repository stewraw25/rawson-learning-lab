/**
 * Official, oEmbed-verified lesson clips.
 * Every ID was checked with https://www.youtube.com/oembed?url=...&format=json
 * and is embeddable. Lengths are from the public YouTube watch page (lengthSeconds).
 * Only Corbettmaths Primary / Corbettmaths official videos, short, UK curriculum.
 * Never invent IDs. Lessons still work if a clip fails to load.
 */
const VERIFIED_LESSON_VIDEOS = [
  {
    id: "3sSyJWLpX70",
    title: "Place Value - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=3sSyJWLpX70",
    embed: "https://www.youtube-nocookie.com/embed/3sSyJWLpX70?rel=0&modestbranding=1",
    duration: "5:33",
    durationSec: 333,
    lessons: [["maths","y-place",1], ["maths","y-place",2], ["maths","y-place",3], ["maths","number",1]],
  },
  {
    id: "h8wjXaecKM4",
    title: "Addition - Corbettmaths",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=h8wjXaecKM4",
    embed: "https://www.youtube-nocookie.com/embed/h8wjXaecKM4?rel=0&modestbranding=1",
    duration: "1:54",
    durationSec: 114,
    lessons: [["maths","y-add",1], ["maths","y-add",2], ["maths","operations",1]],
  },
  {
    id: "6UCV8919-ZQ",
    title: "Subtraction - Corbettmaths",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=6UCV8919-ZQ",
    embed: "https://www.youtube-nocookie.com/embed/6UCV8919-ZQ?rel=0&modestbranding=1",
    duration: "4:03",
    durationSec: 243,
    lessons: [["maths","y-sub",1], ["maths","y-sub",2], ["maths","operations",2]],
  },
  {
    id: "q3Jk6W4oDgw",
    title: "Division - Corbettmaths",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=q3Jk6W4oDgw",
    embed: "https://www.youtube-nocookie.com/embed/q3Jk6W4oDgw?rel=0&modestbranding=1",
    duration: "4:02",
    durationSec: 242,
    lessons: [["maths","y-share",1], ["maths","y-share",2], ["maths","y-share",3], ["maths","operations",3]],
  },
  {
    id: "IvCSDf0yPiI",
    title: "Adding Fractions with the Same Denominator - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=IvCSDf0yPiI",
    embed: "https://www.youtube-nocookie.com/embed/IvCSDf0yPiI?rel=0&modestbranding=1",
    duration: "2:20",
    durationSec: 140,
    lessons: [["maths","fractions",1], ["maths","fractions",2]],
  },
  {
    id: "oXRM-FdOE8w",
    title: "Equivalent Fractions - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=oXRM-FdOE8w",
    embed: "https://www.youtube-nocookie.com/embed/oXRM-FdOE8w?rel=0&modestbranding=1",
    duration: "4:53",
    durationSec: 293,
    lessons: [["maths","fractions",3]],
  },
  {
    id: "nRMWUNl1YZY",
    title: "Simplifying Fractions - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=nRMWUNl1YZY",
    embed: "https://www.youtube-nocookie.com/embed/nRMWUNl1YZY?rel=0&modestbranding=1",
    duration: "4:58",
    durationSec: 298,
    lessons: [["maths","fractions",4]],
  },
  {
    id: "ZXuN1fT0RHs",
    title: "Multiplying Fractions - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=ZXuN1fT0RHs",
    embed: "https://www.youtube-nocookie.com/embed/ZXuN1fT0RHs?rel=0&modestbranding=1",
    duration: "6:31",
    durationSec: 391,
    lessons: [["maths","fractions",5], ["maths","fractions",6]],
  },
  {
    id: "v3b6esP88gc",
    title: "One Step Equations - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=v3b6esP88gc",
    embed: "https://www.youtube-nocookie.com/embed/v3b6esP88gc?rel=0&modestbranding=1",
    duration: "4:19",
    durationSec: 259,
    lessons: [["maths","algebra",3], ["maths","algebra",4]],
  },
  {
    id: "pW8IbYIUHOs",
    title: "Two Step Equations - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=pW8IbYIUHOs",
    embed: "https://www.youtube-nocookie.com/embed/pW8IbYIUHOs?rel=0&modestbranding=1",
    duration: "4:51",
    durationSec: 291,
    lessons: [["maths","algebra",5]],
  },
  {
    id: "YyBlrUAttVo",
    title: "Letters on Both Sides - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=YyBlrUAttVo",
    embed: "https://www.youtube-nocookie.com/embed/YyBlrUAttVo?rel=0&modestbranding=1",
    duration: "2:51",
    durationSec: 171,
    lessons: [["maths","algebra",6]],
  },
  {
    id: "dqg1DQCJa-E",
    title: "Types of Angle",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=dqg1DQCJa-E",
    embed: "https://www.youtube-nocookie.com/embed/dqg1DQCJa-E?rel=0&modestbranding=1",
    duration: "2:18",
    durationSec: 138,
    lessons: [["maths","y-shape2",3], ["maths","geometry",3]],
  },
  {
    id: "i95n30i0Oq8",
    title: "Types of Triangle - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=i95n30i0Oq8",
    embed: "https://www.youtube-nocookie.com/embed/i95n30i0Oq8?rel=0&modestbranding=1",
    duration: "2:51",
    durationSec: 171,
    lessons: [["maths","y-shape2",1], ["maths","y-shape2",2], ["maths","geometry",1]],
  },
  {
    id: "Qv3EGzRmCYc",
    title: "Area of a Rectangle - Corbettmaths",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=Qv3EGzRmCYc",
    embed: "https://www.youtube-nocookie.com/embed/Qv3EGzRmCYc?rel=0&modestbranding=1",
    duration: "2:05",
    durationSec: 125,
    lessons: [["maths","y-measure",3], ["maths","geometry",2]],
  },
  {
    id: "jHMH_MLCI38",
    title: "Area of a Triangle - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=jHMH_MLCI38",
    embed: "https://www.youtube-nocookie.com/embed/jHMH_MLCI38?rel=0&modestbranding=1",
    duration: "4:04",
    durationSec: 244,
    lessons: [["maths","geometry",4]],
  },
  {
    id: "QEsjIeSnEHU",
    title: "Angles in a Triangle",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=QEsjIeSnEHU",
    embed: "https://www.youtube-nocookie.com/embed/QEsjIeSnEHU?rel=0&modestbranding=1",
    duration: "4:33",
    durationSec: 273,
    lessons: [["maths","geometry",5], ["maths","geometry",6]],
  },
  {
    id: "_obYym1MNxs",
    title: "Time - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=_obYym1MNxs",
    embed: "https://www.youtube-nocookie.com/embed/_obYym1MNxs?rel=0&modestbranding=1",
    duration: "5:16",
    durationSec: 316,
    lessons: [["maths","y-time",1], ["maths","y-time",2], ["maths","y-time",3]],
  },
  {
    id: "GBlJ4UWJmAE",
    title: "Bar Charts - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=GBlJ4UWJmAE",
    embed: "https://www.youtube-nocookie.com/embed/GBlJ4UWJmAE?rel=0&modestbranding=1",
    duration: "6:28",
    durationSec: 388,
    lessons: [["maths","data",1], ["maths","data",2]],
  },
  {
    id: "QqXLJRMxelk",
    title: "The Mean - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=QqXLJRMxelk",
    embed: "https://www.youtube-nocookie.com/embed/QqXLJRMxelk?rel=0&modestbranding=1",
    duration: "1:49",
    durationSec: 109,
    lessons: [["maths","data",3], ["maths","data",4], ["maths","data",5], ["maths","data",6]],
  },
  {
    id: "2J-qikp7vTs",
    title: "Ordering Decimals - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=2J-qikp7vTs",
    embed: "https://www.youtube-nocookie.com/embed/2J-qikp7vTs?rel=0&modestbranding=1",
    duration: "5:45",
    durationSec: 345,
    lessons: [["maths","number",2], ["maths","number",3]],
  },
  {
    id: "0uFNnBxoIJE",
    title: "Metric Units for Length - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=0uFNnBxoIJE",
    embed: "https://www.youtube-nocookie.com/embed/0uFNnBxoIJE?rel=0&modestbranding=1",
    duration: "5:51",
    durationSec: 351,
    lessons: [["maths","y-measure",1], ["maths","y-measure",2]],
  },
  {
    id: "vHi5hMJtZpY",
    title: "Negative Numbers - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=vHi5hMJtZpY",
    embed: "https://www.youtube-nocookie.com/embed/vHi5hMJtZpY?rel=0&modestbranding=1",
    duration: "5:21",
    durationSec: 321,
    lessons: [["maths","number",4], ["maths","operations",4]],
  },
  {
    id: "QWsQ0RjCC5g",
    title: "Rounding to the nearest 10 - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=QWsQ0RjCC5g",
    embed: "https://www.youtube-nocookie.com/embed/QWsQ0RjCC5g?rel=0&modestbranding=1",
    duration: "3:46",
    durationSec: 226,
    lessons: [["maths","number",5]],
  },
  {
    id: "2YpURODDiLc",
    title: "Rounding to the nearest 100 - Primary",
    channel: "corbettmaths",
    url: "https://www.youtube.com/watch?v=2YpURODDiLc",
    embed: "https://www.youtube-nocookie.com/embed/2YpURODDiLc?rel=0&modestbranding=1",
    duration: "4:38",
    durationSec: 278,
    lessons: [["maths","number",6]],
  },
];

const VERIFIED_VIDEO_BY_LESSON = {};
VERIFIED_LESSON_VIDEOS.forEach((clip) => {
  (clip.lessons || []).forEach((row) => {
    const key = row[0] + ":" + row[1] + ":" + row[2];
    if (!VERIFIED_VIDEO_BY_LESSON[key]) VERIFIED_VIDEO_BY_LESSON[key] = clip;
  });
});

function getVerifiedLessonVideo(subject, skillId, stage) {
  if (!subject || !skillId) return null;
  const key = subject + ":" + skillId + ":" + (Number(stage) || 1);
  return VERIFIED_VIDEO_BY_LESSON[key] || null;
}

function verifiedVideoPanelHtml(clip, opts) {
  opts = opts || {};
  if (!clip) return "";
  const esc = typeof escapeHtml === "function" ? escapeHtml : (s) => String(s || "");
  const title = esc(clip.title || "Watch a short video");
  const channel = esc(clip.channel || "");
  const dur = clip.duration ? " · " + esc(clip.duration) : "";
  const url = esc(clip.url || "");
  const embed = clip.embed ? esc(clip.embed) : "";
  const media = embed
    ? `<div class="clip-frame"><iframe src="${embed}" title="${title}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
       <p class="clip-fallback muted"><a href="${url}" target="_blank" rel="noopener noreferrer">Open “${title}” on YouTube (new tab)</a></p>`
    : `<p class="muted"><a class="btn btn-secondary" href="${url}" target="_blank" rel="noopener noreferrer">▶ Watch “${title}” (new tab)</a></p>`;
  const skip = opts.skipButton !== false
    ? `<button type="button" class="btn btn-primary btn-lg clip-skip" id="btnSkipClip" style="margin-top:0.75rem">Skip →</button>`
    : "";
  return `<div class="clip-panel" id="teachClipPanel">
    <p class="clip-kicker">Short video${channel ? " · " + channel : ""}${dur}</p>
    ${media}
    ${skip}
  </div>`;
}

var _getVideoForModuleOriginal = typeof getVideoForModule === "function" ? getVideoForModule : null;
getVideoForModule = function (mod, subject, skillId, stage) {
  const sub = subject || (mod && mod.subject);
  const sk = skillId || (mod && (mod.skillId || mod.id));
  const st = stage || (mod && (mod.stage || mod.stageNum));
  const verified = getVerifiedLessonVideo(sub, sk, st);
  if (verified) return verified;
  if (_getVideoForModuleOriginal) return _getVideoForModuleOriginal(mod);
  if (mod && mod.videoKey && typeof VIDEO_LINKS !== "undefined") return VIDEO_LINKS[mod.videoKey] || null;
  return null;
}

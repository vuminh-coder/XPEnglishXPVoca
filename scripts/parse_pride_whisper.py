raw_text = """
[00:09.600 --> 00:13.600] Miss Elizabeth, I have struggled in vain, and I can bear it no longer.
[00:13.600 --> 00:16.800] These past months have been a torment.
[00:16.800 --> 00:19.400] I came to Rosings with a single object of seeing you.
[00:19.400 --> 00:20.400] I had to see you.
[00:20.400 --> 00:26.400] I have fought against my better judgment, my family's expectations, the inferiority of your birth,
[00:26.400 --> 00:30.800] my rank and circumstance, all these things, and I'm willing to put them aside
[00:30.800 --> 00:32.400] and ask you to end my agony.
[00:32.400 --> 00:33.400] I don't understand.
[00:33.400 --> 00:37.400] I love you.
[00:37.400 --> 00:40.400] Most ardently.
[00:40.400 --> 00:45.000] Please do me the honor of accepting my hand.
[00:45.000 --> 00:52.200] Sir, I appreciate the struggle you have been through, and I am very sorry to have caused you pain.
[00:52.200 --> 00:54.400] Believe me, it was unconsciously done.
[00:54.400 --> 00:55.800] Is this your reply?
[00:55.800 --> 00:57.200] Yes, sir.
[00:57.200 --> 00:59.000] Are you laughing at me?
[00:59.000 --> 01:00.000] No.
[01:00.000 --> 01:01.800] Are you rejecting me?
[01:01.800 --> 01:07.400] I'm sure that the feelings which you've told me have hindered your regard will help you in overcoming it.
[01:07.400 --> 01:13.600] Might I ask why, with so little endeavor at civility, I am thus repulsed?
[01:13.600 --> 01:21.000] I might as well inquire why, with so evident a design of insulting me, you chose to tell me that you liked me against your better judgment.
[01:21.000 --> 01:22.000] No, believe me--
[01:22.000 --> 01:25.800] If I was uncivil, then that is some excuse, but I have other reasons.
[01:25.800 --> 01:26.800] You know I have.
[01:26.800 --> 01:28.000] What reasons?
[01:28.000 --> 01:34.200] Do you think that anything might tempt me to accept the man who has ruined, perhaps forever, the happiness of a most beloved sister?
[01:34.200 --> 01:42.800] Do you deny it, Mr. Darcy, that you separated a young couple who loved each other, exposing your friend to the censure of the world for caprice,
[01:42.800 --> 01:48.200] and my sister to its derision for disappointed hopes, and involving them both in misery of the acutest kind?
[01:48.200 --> 01:50.000] I do not deny it.
[01:50.000 --> 01:51.600] How could you do it?
[01:51.600 --> 01:54.600] Because I believed your sister indifferent to him.
[01:54.600 --> 01:56.000] Indifferent?
[01:56.000 --> 02:00.200] I watched them most carefully, and realized his attachment was deeper than hers.
[02:00.200 --> 02:01.600] That's because she's shy.
[02:01.600 --> 02:05.400] Bingley, too, is modest and was persuaded she didn't feel strongly.
[02:05.400 --> 02:06.800] Because you suggested it!
[02:06.800 --> 02:08.800] I did it for his own good.
[02:08.800 --> 02:11.800] My sister hardly shows her true feelings to me.
[02:11.800 --> 02:16.800] I suppose you suspect that his fortune had some bearing.
[02:16.800 --> 02:19.400] No, I would not dishonor your sister, though it was suggested--
[02:19.400 --> 02:20.400] What was?
[02:20.400 --> 02:23.600] It was suggested that an advantageous marriage--
[02:23.600 --> 02:25.000] Did my sister give that impression?
[02:25.000 --> 02:26.000] No!
[02:26.000 --> 02:27.000] No, no.
[02:27.000 --> 02:30.400] There was, however, I have to admit, the matter of your family.
[02:30.400 --> 02:32.400] Our want of connection?
[02:32.400 --> 02:35.800] Mr. Bingley didn't seem to vex himself about that.
[02:35.800 --> 02:40.800] No, it was the lack of propriety shown by your mother, your three younger sisters,
[02:40.800 --> 02:44.200] even on occasion, your father.
[02:44.200 --> 02:45.400] Forgive me.
[02:45.400 --> 02:48.400] You and your sister, I must exclude.
[02:48.400 --> 02:50.400] And what about Mr. Wickham?
[02:50.400 --> 02:51.600] Mr. Wickham?
[02:51.600 --> 02:55.200] What excuse can you give to your behavior towards him?
[02:55.200 --> 02:58.800] You take an eager interest in that gentleman's concerns.
[02:58.800 --> 03:00.400] He told me of his misfortunes.
[03:00.400 --> 03:04.600] Oh, yes, his misfortunes have been very great indeed.
[03:04.600 --> 03:09.000] You ruin his chances, and yet you treat him with sarcasm?
[03:09.000 --> 03:11.800] So this is your opinion of me.
[03:11.800 --> 03:14.600] Thank you for explaining so fully.
[03:14.600 --> 03:22.400] Perhaps these offenses might have been overlooked had not your pride been hurt by my honesty in admitting scruples about our relationship.
[03:22.400 --> 03:27.800] Could you expect me to rejoice in the inferiority of your circumstances?
[03:27.800 --> 03:31.000] And those are the words of a gentleman?
[03:31.000 --> 03:35.400] From the first moment I met you, your arrogance and conceit,
[03:35.400 --> 03:43.000] your selfish disdain for the feelings of others made me realize that you were the last man in the world I could ever be prevailed upon to marry.
[03:43.000 --> 04:06.000] [MUSIC PLAYING]
[04:06.000 --> 04:12.800] Forgive me, madam, for taking up so much of your time.
"""

import re

lines = [l.strip() for l in raw_text.strip().split("\n") if l.strip()]
segments = []

def parse_time(t_str):
    m, s = t_str.split(":")
    return int(m) * 60 + float(s)

idx = 0
for l in lines:
    m = re.match(r"\[(\d+:\d+\.\d+)\s*-->\s*(\d+:\d+\.\d+)\]\s*(.*)", l)
    if m:
        st = parse_time(m.group(1))
        et = parse_time(m.group(2))
        txt = m.group(3).strip()
        if txt == "[MUSIC PLAYING]":
            continue
        segments.append({
            "idx": idx,
            "start": round(st, 1),
            "end": round(et, 1),
            "text": txt
        })
        idx += 1

print(f"Total parsed segments: {len(segments)}")
for s in segments:
    print(f"[{s['idx']:02d}] {s['start']:5.1f}s -> {s['end']:5.1f}s | {s['text']}")

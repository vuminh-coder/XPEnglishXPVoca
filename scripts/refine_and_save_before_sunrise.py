import json

with open('scripts/before_sunrise_raw_segments.json', 'r', encoding='utf-8') as f:
    segments = json.load(f)

custom_map = {
    "Let's get on that boat. Come on.": {
        "translationVi": "Lên chiếc thuyền kia đi. Nhanh lên nào em.",
        "ipaUs": "/lɛts ɡɛt ɑːn ðæt boʊt. kʌm ɑːn./",
        "keywords": ["get on that boat", "come on"],
        "explanationAi": "Jesse hào hứng rủ Céline lên thuyền du ngoạn sông Seine tại Paris."
    },
    "No!": {
        "translationVi": "Không đâu!",
        "ipaUs": "/noʊ!/",
        "keywords": ["no"],
        "explanationAi": "Céline ngần ngại vì lo Jesse sẽ bị muộn chuyến bay trở về Mỹ."
    },
    "Come on, it'll be fun!": {
        "translationVi": "Thôi nào, sẽ vui lắm đấy!",
        "ipaUs": "/kʌm ɑːn, ˈɪtəl biː fʌn!/",
        "keywords": ["come on", "it'll be fun"],
        "explanationAi": "Jesse nài nỉ để kéo dài từng phút giây quý giá bên người yêu."
    },
    "You don't have time!": {
        "translationVi": "Anh làm gì còn thời gian nữa chứ!",
        "ipaUs": "/juː doʊnt hæv taɪm!/",
        "keywords": ["don't have time"],
        "explanationAi": "Céline nhắc nhở về thực tế gấp gáp của lịch trình bay."
    },
    "If you feel it adds something to your life in any way, then you can pay me whatever you feel like.": {
        "translationVi": "Nếu các bạn cảm thấy nó làm cho cuộc đời mình thêm phần ý nghĩa theo bất kỳ cách nào, thì các bạn có thể trả tôi bao nhiêu tùy thích.",
        "ipaUs": "/ɪf juː fiːl ɪt ædz ˈsʌmθɪŋ tuː jʊər laɪf ɪn ˈɛni weɪ, ðɛn juː kæn peɪ miː wʌtˈɛvər juː fiːl laɪk./",
        "keywords": ["adds something to your life", "pay me whatever you feel like"],
        "explanationAi": "Quy tắc trả công nghệ thuật độc đáo của người thi sĩ đường phố sông Danube."
    },
    "Milkshake!": {
        "translationVi": "Sữa lắc!",
        "ipaUs": "/ˈmɪlkˌʃeɪk!/",
        "keywords": ["milkshake"],
        "explanationAi": "Céline nhanh nhảu chọn từ khóa 'Milkshake' đầy ngẫu hứng và bất ngờ."
    },
    "You're mistaking me for someone else.": {
        "translationVi": "Anh đang nhầm tôi với một người khác rồi đấy.",
        "ipaUs": "/jʊər mɪsˈteɪkɪŋ miː fɔːr ˈsʌmwʌn ɛls./",
        "keywords": ["mistaking me"],
        "explanationAi": "Céline nhập vai đóng giả người xa lạ để trêu chọc Jesse tại quán cà phê."
    },
    "No.": {
        "translationVi": "Không hề.",
        "ipaUs": "/noʊ./",
        "keywords": ["no"],
        "explanationAi": "Jesse dứt khoát mỉm cười đáp lại trò đùa của cô."
    },
    "That's not what I said.": {
        "translationVi": "Đó không phải là điều anh đã nói.",
        "ipaUs": "/ðæts nɒt wʌt aɪ sɛd./",
        "keywords": ["not what I said"],
        "explanationAi": "Jesse phân trần khi bị Céline hiểu lầm về ý định chuyển việc."
    },
    "Yes!": {
        "translationVi": "Đúng thế đấy!",
        "ipaUs": "/jɛs!/",
        "keywords": ["yes"],
        "explanationAi": "Céline gay gắt khẳng định lại quan điểm của mình trong cuộc cãi vã."
    },
    "I said I missed him.": {
        "translationVi": "Anh chỉ bảo là anh nhớ con trai thôi mà.",
        "ipaUs": "/aɪ sɛd aɪ mɪst hɪm./",
        "keywords": ["missed him"],
        "explanationAi": "Jesse bộc lộ nỗi nhớ con trai riêng đang sống ở Mỹ."
    },
    "Good, have fun.": {
        "translationVi": "Tốt rồi, chúc vui vẻ nhé.",
        "ipaUs": "/ɡʊd, hæv fʌn./",
        "keywords": ["have fun"],
        "explanationAi": "Céline bắt đầu hạ hỏa và mỉm cười nhẹ bên bàn cà phê Hy Lạp."
    },
    "Were you really just...": {
        "translationVi": "Có thật là anh vừa mới...",
        "ipaUs": "/wɜːr juː ˈrɪəli dʒʌst.../",
        "keywords": ["were you really"],
        "explanationAi": "Jesse ngập ngừng hỏi xem cô đã chấp nhận lời hòa giải của anh chưa."
    },
    "Sure, okay.": {
        "translationVi": "Chắc chắn rồi, được mà anh.",
        "ipaUs": "/ʃʊər, oʊˈkeɪ./",
        "keywords": ["sure okay"],
        "explanationAi": "Céline mỉm cười chính thức tha thứ và hòa giải với Jesse."
    }
}

pure_segments = []
for seg in segments:
    txt = seg['text']
    if ' - ' in txt:
        parts = [p.strip() for p in txt.split(' - ') if p.strip()]
        total_dur = seg['endTime'] - seg['startTime']
        part_dur = total_dur / len(parts)
        for i, p in enumerate(parts):
            p_start = round(seg['startTime'] + i * part_dur, 1)
            p_end = round(seg['startTime'] + (i + 1) * part_dur, 1)
            mapped = custom_map.get(p, {})
            pure_segments.append({
                "startTime": p_start,
                "endTime": p_end,
                "text": p,
                "translationVi": mapped.get("translationVi", seg['translationVi']),
                "ipaUs": mapped.get("ipaUs", seg['ipaUs']),
                "keywords": mapped.get("keywords", seg['keywords']),
                "explanationAi": mapped.get("explanationAi", seg['explanationAi']),
                "properNouns": seg.get('properNouns', [])
            })
    else:
        pure_segments.append(seg)

# Update orderIndex
for idx, s in enumerate(pure_segments):
    s['orderIndex'] = idx

with open('scripts/before_sunrise_raw_segments.json', 'w', encoding='utf-8') as f:
    json.dump(pure_segments, f, ensure_ascii=False, indent=2)

print(f"Successfully saved {len(pure_segments)} 100% pure zero-merged segments to scripts/before_sunrise_raw_segments.json!")

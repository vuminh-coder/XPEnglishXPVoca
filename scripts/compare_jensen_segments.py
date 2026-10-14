import re

old_segments = [
    "From the moment of concept to building a massive factory, liquid-cooled, energized, permitted in the short time that was done, that is like superhuman, right?",
    "And as far as I know, there's only one person in the world who could do that.",
    "You know, I mean Elon is singular in this understanding of engineering, and construction, and large systems, and marshaling resources, it's unbelievable.",
    "And of course, then his engineering team is extraordinary.",
    "And from the moment that we decided to go, the planning with our engineering team, our networking team, our infrastructure computing team, the software team, all of the preparation in advance.",
    "Then all of the infrastructure, all of the logistics, and the amount of technology and equipment that came in on that day to train in 19 days.",
    "19 days! 19 days is incredible. But it's also kind of nice to just take a step back, you know how many days 19 days is? It's just a couple of weeks.",
    "And the mountain of technology, if you're ever to see it, is unbelievable: all of the wiring and the networking, just getting this mountain of technology integrated, and all the software. Incredible, right?",
    "Yeah, so I think what Elon and the xAI team did, what they achieved is singular, never been done before. Just to put in perspective: 100,000 GPUs, that's easily the fastest supercomputer on the planet as one cluster.",
    "A supercomputer that you would build would take normally three years to plan, right? And then they deliver the equipment and it takes one year to get it all working. Yes, we're talking about 19 days."
]

new_segments = [
    "From the moment of concept to building a massive factory,",
    "liquid-cooled, energized, permitted in the short time that was done,",
    "that is like superhuman, right?",
    "And as far as I know, there's only one person in the world who could do that.",
    "You know, I mean Elon is singular in this understanding of engineering,",
    "and construction, and large systems, and marshaling resources,",
    "it's unbelievable.",
    "And of course, then his engineering team is extraordinary.",
    "And from the moment that we decided to go,",
    "the planning with our engineering team, our networking team,",
    "our infrastructure computing team, the software team,",
    "all of the preparation in advance.",
    "Then all of the infrastructure, all of the logistics,",
    "and the amount of technology and equipment that came in on that day",
    "to train in 19 days.",
    "19 days!",
    "19 days is incredible.",
    "But it's also kind of nice to just take a step back,",
    "you know how many days 19 days is?",
    "It's just a couple of weeks.",
    "And the mountain of technology, if you're ever to see it, is unbelievable:",
    "all of the wiring and the networking,",
    "just getting this mountain of technology integrated, and all the software.",
    "Incredible, right?",
    "Yeah, so I think what Elon and the xAI team did,",
    "what they achieved is singular, never been done before.",
    "Just to put in perspective:",
    "100,000 GPUs, that's easily the fastest supercomputer on the planet as one cluster.",
    "A supercomputer that you would build would take normally three years to plan, right?",
    "And then they deliver the equipment and it takes one year to get it all working.",
    "Yes, we're talking about 19 days."
]

def clean_words(text_list):
    full_str = " ".join(text_list).lower()
    cleaned = re.sub(r'[^a-z0-9\s]', ' ', full_str)
    return [w.strip() for w in cleaned.split() if w.strip()]

old_words = clean_words(old_segments)
new_words = clean_words(new_segments)

print(f"Old words count: {len(old_words)}")
print(f"New words count: {len(new_words)}")
print(f"Exact word sequence match: {old_words == new_words}")
if old_words != new_words:
    for i in range(min(len(old_words), len(new_words))):
        if old_words[i] != new_words[i]:
            print(f"Mismatch at index {i}: old='{old_words[i]}' vs new='{new_words[i]}'")
            break

import re

def split_into_sections(text: str) -> list[dict]:
    text = text.strip()
    text = re.sub(r'\*{1,3}(.+?)\*{1,3}', r'\1', text)  # remove bold/italic markers
    text = re.sub(r'#{1,6}\s*', '', text)                 # remove markdown headers
    text = re.sub(r'^\s*\*\s+', '', text, flags=re.MULTILINE)  # FIX: strip "* item" bullets
    text = re.sub(r'^\s*[-•]\s+', '', text, flags=re.MULTILINE) # strip "- item" and "• item" bullets
    text = re.sub(r':\s*\n', '\n', text)

    lines = [l.strip() for l in text.splitlines() if l.strip()]
    sections = []

    if len(lines) >= 2:
        current_title = None
        current_body = []
        for line in lines:
            is_title = (
                len(line) < 55
                and not line.endswith('.')
                and not line.endswith(',')
                and len(line.split()) <= 7
                and line[0].isupper()
            )
            if is_title:
                if current_title is not None or current_body:
                    sections.append({'title': current_title, 'body': ' '.join(current_body).strip()})
                current_title = line
                current_body = []
            else:
                current_body.append(line)
        if current_title is not None or current_body:
            sections.append({'title': current_title, 'body': ' '.join(current_body).strip()})

    # Fallback: model wrote one long inline paragraph — detect TitleCase section headers
    if not sections or (len(sections) == 1 and not sections[0].get('title')):
        sections = []
        pattern = re.compile(
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,5})\s+([A-Z].+?)(?=(?:[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,5})\s+[A-Z]|$)',
            re.DOTALL
        )
        for m in pattern.finditer(text):
            title = m.group(1).strip()
            body  = m.group(2).strip()
            if len(title.split()) >= 2:
                sections.append({'title': title, 'body': body})

    if not sections:
        sections = [{'title': None, 'body': text}]

    return sections


def format_response(text: str) -> str:
    """Plain text with clear title + body spacing between sections."""
    sections = split_into_sections(text)
    parts = []

    for s in sections:
        block = ''
        if s['title']:
            block += s['title'] + '\n'
        if s['body']:
            body = s['body']
            # Pull the follow-up question onto its own paragraph
            q_match = re.search(r'([^.!?]*\?)$', body)
            if q_match:
                before = body[:q_match.start()].strip()
                question = q_match.group(1).strip()
                if before:
                    block += before
                block = block.strip()
                parts.append(block)
                parts.append('\n' + question)
                continue
            block += body
        parts.append(block.strip())

    result = '\n\n'.join(p for p in parts if p.strip())
    result = re.sub(r'\n{3,}', '\n\n', result)
    return result.strip()
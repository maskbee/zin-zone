import os
import re

zh_translations = {
    1: "为什么别人干6个月就能升组长，而自己苦熬3年还在原地踏步？",
    2: "秘密就在这台手机里：Zin Zone 手机——21天邪修速成汉语，工厂升职神器！",
    3: "开机即送价值 150 万越南盾的 Zin Zone 官方正版软件！",
    4: "告别枯燥繁琐的书本语法。",
    5: "软件唤醒你血液中自带的 70% 汉越同源词！",
    6: "100% 车间实战指令：直接与中国主管对线、报修设备、申请加班、核对工单……",
    7: "边玩修仙升级，边把汉语说得滚瓜烂熟，只需 21 天！",
    8: "这批严选二手极品靓机，100% 纯原装到每一颗螺丝，绝无任何拆修拆焊！",
    9: "车间直通补贴价：哪怕只买 1 台，也直接按仓库批发底价给你！",
    10: "系统极致流畅，超长续航电池，连上夜班也能轻松抗住！",
    11: "特别福利：只要推荐 1 位工友或同组朋友拿机，立送 20 万现金红包到手！",
    12: "介绍 5 个人，轻轻松松净赚 100 万现金塞进钱包！",
    13: "不用花几百万去昂贵的培训班，只要这台手机在手 21 天，自信流利说中文，升职改写命运！",
    14: "批发底价原装机数量有限，赶紧点击私信或直接来店抢购吧！"
}

def parse_srt(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read().strip()
    blocks = re.split(r'\n\s*\n', content)
    cues = []
    for b in blocks:
        lines = b.strip().split('\n')
        if len(lines) >= 3:
            idx = int(lines[0].strip())
            time_line = lines[1].strip()
            text = '\n'.join(lines[2:]).strip()
            cues.append({'idx': idx, 'time': time_line, 'text': text})
    return cues

def time_to_ms(t_str):
    # 00:00:05,478
    parts = t_str.split(' --> ')
    def parse_one(s):
        h, m, rest = s.strip().split(':')
        sec, ms = rest.split(',')
        return int(h)*3600000 + int(m)*60000 + int(sec)*1000 + int(ms)
    return parse_one(parts[0]), parse_one(parts[1])

def ms_to_time(start_ms, end_ms):
    def fmt(ms):
        h = ms // 3600000
        ms %= 3600000
        m = ms // 60000
        ms %= 60000
        s = ms // 1000
        rem_ms = ms % 1000
        return f"{h:02d}:{m:02d}:{s:02d},{rem_ms:03d}"
    return f"{fmt(start_ms)} --> {fmt(end_ms)}"

def sanitize_cues(cues):
    prev_end = 0
    clean = []
    for c in cues:
        s_ms, e_ms = time_to_ms(c['time'])
        if s_ms < prev_end:
            s_ms = prev_end + 10
        if e_ms <= s_ms:
            e_ms = s_ms + 1000
        prev_end = e_ms
        c['start_ms'] = s_ms
        c['end_ms'] = e_ms
        c['time'] = ms_to_time(s_ms, e_ms)
        clean.append(c)
    return clean

def save_srt(cues, out_path, bilingual=False):
    lines = []
    for c in cues:
        lines.append(str(c['idx']))
        lines.append(c['time'])
        if bilingual and c['idx'] in zh_translations:
            lines.append(c['text'])
            lines.append(zh_translations[c['idx']])
        else:
            lines.append(c['text'])
        lines.append("")
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f"Saved: {out_path}")

base_srt = "audio/promo/zin_zone_promo_nam_minh.srt"
cues = parse_srt(base_srt)
clean_cues = sanitize_cues(cues)

# 1. Standard Vietnamese SRT
save_srt(clean_cues, "audio/promo/zin_zone_promo_vi.srt", bilingual=False)
# 2. Bilingual Vietnamese + Chinese SRT
save_srt(clean_cues, "audio/promo/zin_zone_promo_bilingual.srt", bilingual=True)

# Also update the original nam_minh and hoai_my SRTs with clean timings
save_srt(clean_cues, "audio/promo/zin_zone_promo_nam_minh.srt", bilingual=False)
save_srt(clean_cues, "audio/promo/zin_zone_promo_hoai_my.srt", bilingual=False)

art_dir = "C:/Users/Administrator/.gemini/antigravity/brain/646b0d7c-1157-44a0-bd35-758be8838993"
if os.path.exists(art_dir):
    save_srt(clean_cues, os.path.join(art_dir, "zin_zone_promo_vi.srt"), bilingual=False)
    save_srt(clean_cues, os.path.join(art_dir, "zin_zone_promo_bilingual.srt"), bilingual=True)
    save_srt(clean_cues, os.path.join(art_dir, "zin_zone_promo_nam_minh.srt"), bilingual=False)
    save_srt(clean_cues, os.path.join(art_dir, "zin_zone_promo_hoai_my.srt"), bilingual=False)
    print("Exported all SRTs to artifact directory successfully!")

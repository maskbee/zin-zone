import asyncio
import os
import edge_tts

TEXT = """Tại sao người ta làm 6 tháng đã lên Tổ trưởng, còn mình cày 3 năm vẫn dậm chân tại chỗ? Bí mật nằm ở chiếc máy này: Điện thoại Zin Zone – 21 ngày tốc hành Hán ngữ, thăng chức công xưởng!

Máy được kích hoạt sẵn siêu ứng dụng Zin Zone bản quyền 1 triệu 5 kèm máy! Không cần học ngữ pháp rườm rà. App giúp bạn đánh thức 70% gốc Hán-Việt có sẵn trong máu! 100% khẩu lệnh xưởng thực chiến: nói chuyện với sếp, báo máy hỏng, xin tăng ca, duyệt đơn hàng... Vừa tu tiên lên cấp, vừa thuộc làu làu chỉ sau 21 ngày!

Đây là dòng máy lướt tuyển chọn, chuẩn zin 100% từng con ốc, chưa hề qua sửa chữa! Cửa hàng trợ giá trực tiếp cho anh em công nhân: Mua lẻ 1 máy cũng được tính đúng bằng giá sỉ tại kho! Máy mượt, pin cực trâu, cày ca đêm vô tư!

Đặc biệt, cơ hội kiếm thêm thu nhập cho anh em: Chỉ cần giới thiệu 1 bạn bè hoặc công nhân cùng tổ lấy máy, nhận ngay 200.000 đồng tiền mặt trao tay! Chia sẻ 5 người là có ngay 1 triệu bỏ túi cực kỳ dễ dàng!

Không cần tốn tiền triệu đi trung tâm, chỉ cần cầm chiếc máy này trong tay 21 ngày là tự tin giao tiếp, đổi đời thăng chức! Số lượng máy zin giá sỉ đợt này có hạn, bấm ngay vào nút nhắn tin hoặc ghé tiệm để rinh máy ngay hôm nay!"""

OUTPUT_DIR = "audio/promo"
os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICES = [
    ("vi-VN-NamMinhNeural", "zin_zone_promo_nam_minh.mp3", "+5%"),
    ("vi-VN-HoaiMyNeural", "zin_zone_promo_hoai_my.mp3", "+5%"),
    ("vi-VN-NamMinhNeural", "zin_zone_promo_nam_minh_normal.mp3", "+0%"),
    ("vi-VN-HoaiMyNeural", "zin_zone_promo_hoai_my_normal.mp3", "+0%")
]

async def generate(voice, filename, rate):
    out_path = os.path.join(OUTPUT_DIR, filename)
    communicate = edge_tts.Communicate(TEXT, voice, rate=rate)
    await communicate.save(out_path)
    size = os.path.getsize(out_path)
    print(f"Generated {out_path} with {voice} (rate={rate}): {size} bytes")

async def main():
    for voice, filename, rate in VOICES:
        await generate(voice, filename, rate)

if __name__ == "__main__":
    asyncio.run(main())

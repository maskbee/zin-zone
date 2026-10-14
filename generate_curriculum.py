# -*- coding: utf-8 -*-
"""
generate_curriculum.py
Generates the complete 21-day curriculum data for "Học Tiếng Trung Tà Đạo - 21 Ngày Thăng Chức Nhà Máy Hoa Kiều"
Creates:
1. data/curriculum.js (Interactive web app data with speech and quiz hooks)
2. CURRICULUM_FULL.md (Complete bilingual textbook and manual)
"""
import os
import json

os.makedirs("data", exist_ok=True)
print("Output directory 'data' ready.")

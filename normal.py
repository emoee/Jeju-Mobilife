import pandas as pd
import numpy as np

# CSV 파일 읽어오기
df = pd.read_csv('통합_제주.csv')

# 각 항목의 척도 및 가중치 설정
scales = {
    '버스정류장': {'최솟값': 0, '최댓값': df['버스정류장'].max()},
    '학교': {'최솟값': 0, '최댓값': df['학교'].max()},
    '마을안전시설': {'최솟값': 0, '최댓값': df['마을안전시설'].max()},
    '마을 편의 시설': {'최솟값': 0, '최댓값': df['마을 편의 시설'].max()},
    '응급실보유병원': {'최솟값': 0, '최댓값': df['응급실보유병원'].max()},
    '장애인 복지 시설/기관': {'최솟값': 0, '최댓값': df['장애인 복지 시설/기관'].max()},
    '영화관': {'최솟값': 0, '최댓값': df['영화관'].max()},
}

weights = {
    '버스정류장': 2,
    '학교': 1,
    '마을안전시설': 2,
    '마을 편의 시설': 1,
    '응급실보유병원': 4,
    '장애인 복지 시설/기관': 5,
    '영화관': 1,
    '거래금액(만원)': -1,
}

# 점수 계산 함수
def calculate_score(row):
    score = 0
    for column, scale in scales.items():
        value = row[column]
        min_value = scale['최솟값']
        max_value = scale['최댓값']
        weight = weights[column]

        if pd.notnull(value):
            if isinstance(value, str):
                value = int(value.replace(',', ''))
            score += (value - min_value) / (max_value - min_value) * weight
    return score

# 점수 계산
df['점수'] = df.apply(calculate_score, axis=1)

# 정규화된 점수 계산
min_score = df['점수'].min()
max_score = df['점수'].max()
df['정규화된 점수'] = (df['점수'] - min_score) / (max_score - min_score)

# 순위 계산
df['순위'] = df['정규화된 점수'].rank(method='min', ascending=False)

# 백분위 계산
df['백분위'] = (df['정규화된 점수'] * 100).round(2)

# 결과 출력
result_df = df[['행정시','읍면동', '거래금액(만원)', '버스정류장', '학교', '마을안전시설', '마을 편의 시설', '응급실보유병원', '장애인 복지 시설/기관', '영화관', '백분위']]

# 결측값과 무한대 값을 제거
result_df = result_df.replace([np.inf, -np.inf], np.nan).dropna()

# 시설 열 데이터를 정수로 변환
facilities = ['버스정류장', '학교', '마을안전시설', '마을 편의 시설', '응급실보유병원', '장애인 복지 시설/기관', '영화관']
result_df[facilities] = result_df[facilities].astype(int)

# 순위 계산
result_df['순위'] = result_df['백분위'].rank(method='min', ascending=False).astype(int)

# 결과를 CSV 파일로 저장
result_df.to_csv('통합_제주_점수.csv', index=False)

# 순위로 내림차순 정렬하여 순위 CSV 파일 생성
rank_df = result_df.sort_values(by='순위', ascending=True)

# 각 동별로 항목별 많은 순위와 개수를 기록하여 '비고' 열에 추가
def add_remarks(df):
    facilities = ['마을안전시설', '장애인 복지 시설/기관']

    # 응급실보유병원은 맨 앞에 추가
    df.loc[df['응급실보유병원'] > 0, '비고'] = '응급실보유병원 있음'

    for facility in facilities:
        rank_df = df.sort_values(by=facility, ascending=False)
        top_dongs = rank_df['읍면동'].values[:3]
        for rank, dong in enumerate(top_dongs, start=1):
            count = rank_df[rank_df['읍면동'] == dong][facility].values[0]
            remark = f"{facility} Top{rank} ({count}개)"
            existing_remark = df.loc[df['읍면동'] == dong, '비고'].values[0]
            if existing_remark:
                remark = f"{existing_remark}, {remark}"
            df.loc[df['읍면동'] == dong, '비고'] = remark

    return df

# 가격에 대한 정보를 비고 열에 추가
def add_price_remarks(df):
    max_price_col = '거래금액(만원)'

    # 거래금액(만원) 열의 데이터 유형을 숫자로 변환
    df[max_price_col] = df[max_price_col].str.replace(',', '').astype(int)

    # 가장 비싼 동 top 3 가져오기
    top_price_dongs = df.nlargest(3, max_price_col)['읍면동']

    for rank, dong in enumerate(top_price_dongs, start=1):
        price = df.loc[df['읍면동'] == dong, max_price_col].values[0]
        price_rank_remark = f"거래금액 Top{rank} ({price:,}만원)"

        existing_remark = df.loc[df['읍면동'] == dong, '비고'].values[0]
        if existing_remark:
            price_rank_remark = f"{existing_remark}, {price_rank_remark}"

        df.loc[df['읍면동'] == dong, '비고'] = price_rank_remark

    return df


# '비고' 열 추가
rank_df['비고'] = ''

# '비고' 열에 각 동별로 항목별 많은 순위 추가
rank_df = add_remarks(rank_df)

# '비고' 열에 가격 정보 추가
rank_df = add_price_remarks(rank_df)

# 결과를 CSV 파일로 저장
rank_df.to_csv('통합_제주_순위.csv', index=False)

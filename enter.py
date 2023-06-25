import csv

input_file = 'tourdata.tsv'  # 입력 파일명
output_file = 'tourdata2.tsv'  # 출력 파일명

with open(input_file, 'r', newline='') as file_in, open(output_file, 'w', newline='') as file_out:
    reader = csv.reader(file_in, delimiter='\t')  # 구분자로 탭 문자 설정
    writer = csv.writer(file_out, delimiter='\t')  # 구분자로 탭 문자 설정
    
    for row in reader:
        new_row = [col.replace('\n', ',') for col in row]  # 엔터를 쉼표로 바꾸기
        writer.writerow(new_row)

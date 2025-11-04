# git-auto.ps1
# 변경사항이 있으면 commit("Cypress Tests") 후 push, 없으면 아무 것도 하지 않음

# 1) 모든 변경 스테이징
git add .

# 2) 변경사항이 실제로 있는지 확인
# git status --porcelain: 출력이 비어있으면 변경 없음
$porcelain = git status --porcelain

if ($porcelain -ne "") {
    Write-Host "Changes detected. Committing and pushing..."
    git commit -m "Cypress Tests"
    git push
} else {
    Write-Host "No changes to commit."
}

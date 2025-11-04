git add .
if ($LASTEXITCODE -eq 0) {
    git commit -m "auto commit"
}
git push

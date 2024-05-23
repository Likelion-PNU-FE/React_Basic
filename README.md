<img width="449" alt="image" src="https://github.com/Likelion-PNU-FE/React_Basic/assets/80307321/d0616a32-f067-4e62-801b-dfe27bab5782"># React

5주차~8주차까지 진행되는 React 과제를 수행하는 레포지토리입니다. 해당 과제부터 브랜치 전략이 변경되었으니 아래와 같이 변경해주세요.

## 새로운 브랜치 전략

### 1. 브랜치 생성

main 에서 아래와 같은 이름의 브랜치를 생성합니다. 저의 경우는 Suyeon 이므로, `Suyeon` 과 `Suyeon_working` 을 생성했어요.

> - `이름`
> - `이름_working`
  
<img width="650" alt="image" src="https://github.com/Likelion-PNU-FE/React_Basic/assets/80307321/2147a129-b1f6-40f8-815b-751b399bd80c">

<img width="650" alt="image" src="https://github.com/Likelion-PNU-FE/React_Basic/assets/80307321/2a347a83-5f9f-4d53-b581-b2764fc32682">

<img width="650" alt="image" src="https://github.com/Likelion-PNU-FE/React_Basic/assets/80307321/9c641993-f0dc-476c-af05-8e7f72d1a86a">

<img width="650" alt="image" src="https://github.com/Likelion-PNU-FE/React_Basic/assets/80307321/b4f8585b-683c-4d68-9fe3-92b6e68076a4">

<img width="650" alt="image" src="https://github.com/Likelion-PNU-FE/React_Basic/assets/80307321/6b73367d-3571-4cc6-a01e-db43a55419ec">


### 2. 브랜치 설명

1. **`이름` (예시: Suyeon) 브랜치**
   
   해당 브랜치는 `이름_working` 에서 작업한 내용을 모두 합치는 브랜치예요. 이전엔 `main` 에 자신이 작업한 것을 합쳤다면 이젠 `이름` 브랜치에 합치면 돼요.

2. **`이름_working` (예시: Suyeon_working) 브랜치**
   
  해당 브랜치는 실질적인 작업이 이뤄지는 브랜치예요. `이름_working` 에서 과제를 진행하고 난 다음, PR 을 올릴 땐 `이름` 브랜치로 merge 하면 돼요.

### 3. PR 작성하기

이제 `이름_working` 에서 작업한 다음 `이름` 브랜치에 모든 작업물을 합쳐주셔야 합니다. 그러기 위해 PR 문서를 작성할 때 브랜치가 올바르게 되어있는지를 꼭 확인해주세요!

<img width="776" alt="image" src="https://github.com/Likelion-PNU-FE/React_Basic/assets/80307321/643bfbe0-f5cf-433d-bac7-fb471e2d2a46">
<img width="584" alt="image" src="https://github.com/Likelion-PNU-FE/React_Basic/assets/80307321/cbad82c9-9710-4dc6-83ba-7ad29d0960cf">

### 4. PR 머지하기

- 매 과제가 끝나면 PR 을 작성한 뒤 `Merge Pull Request` 버튼을 눌러 꼭 `이름` 브랜치에 머지를 해주세요.
- 그 다음 주차 과제는 `이름_working` 브랜치에서 다시 작업을 이어나가면 됩니다.

<img width="1013" alt="image" src="https://github.com/Likelion-PNU-FE/React_Basic/assets/80307321/b7730b9c-f458-436d-80eb-6bb011f5af6c">

### 5. 주의할 점!!

아마 `create-react-app` 으로 프로젝트를 생성한 경우 `.gitignore` 파일이 자동으로 생성되어 있겠으나, 만에 하나 없는 경우 `.gitignore` 파일을 생성하고 아래와 같이 입력해주세요.

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
.vscode
*.local
.env

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Local Netlify folder
.netlify
```



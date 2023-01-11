# [나라 스페이스 테크놀로지] 프론트엔드 개발자 과제

<br />

## :rocket: Demo

#### 🔗 **Demo site**: **https://brad-user-list.netlify.app/**

#### 🔗 **Storybook**: **https://63beaf11c17ca17a6d1de434-fautjhnhat.chromatic.com/**

<br />

## 목차

1. [프로젝트 소개](#speaking_head-1-프로젝트-소개)
2. [사용된 기술 스택](#books-2-사용된-기술-스택)
3. [프로젝트 실행 방법](#🪄-3-프로젝트-실행-방법)
4. [구현한 기능](#gear-4-구현한-기능)
5. [디렉토리 구조](#open_file_folder-5-디렉토리-구조)

<br />

## :speaking_head: 1. 프로젝트 소개

> 나라 스페이스 테크놀로지 프론트엔드 개발자 과제를 진행합니다.

- 개인 프로젝트
- 제작기간: 2023.01.04 ~ 2023.01.09
- 저장소: https://github.com/brad-go/nara-space-frontend-assignment

<br />

[⬆️ Back to top](#목차)
<br />

## :books: 2. 사용된 기술 스택

![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white) ![](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white) ![](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white) ![](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white) ![](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=Storybook&logoColor=white) ![](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white) ![](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white)

- **CRA(Create React App)없이** 웹팩과 바벨 등을 설정해서 프로젝트를 구현했습니다.
- **리덕스(redux toolkit, react-redux)를 사용해서 상태를 관리**했습니다.
- **스토리북**을 통해 개별 UI 개발과 **시각화 테스트**를 진행했습니다.

<br />

[⬆️ Back to top](#목차)
<br />

## 🪄 3. 프로젝트 실행 방법

1. git clone하여 프로젝트를 내려받습니다.

```bash
git clone https://github.com/brad-go/nara-space-frontend-assignment.git
```

2. 아래 커맨드로 패키지를 설치합니다.

```bash
yarn install
```

3. 프로젝트 root 폴더에 `.env` 파일을 생성하고 아래 내용을 작성합니다.

```bash
REACT_APP_API_URL=http://localhost:3010
```

4. 아래 커맨드로 프로젝트를 실행합니다. (서버와 동시에 실행 됩니다.)

```bash
yarn start
```

<br />

[⬆️ Back to top](#목차)
<br />

## :gear: 4. 구현한 기능

- [유저의 id를 path parameter로 사용해서 동적 라우팅하기](#유저의-id를-path-parameter로-사용해서-동적-라우팅하기)
- [scroll bar, input, selectbox 구현하기](#scroll-bar-input-select-박스-구현하기)
- [json-server를 통해 mock 데이터 사용하기](#json-server를-통해-mock-데이터user_datajson-사용하기)
- [오름차순, 내림차순 정렬하기](#오름차순-내림차순-정렬하기)
- [두 개의 유저목록 만들기](#두-개의-유저-목록-만들기)
- [새롭게 추가된 유저의 위치에 따라 스크롤하기](#오른쪽-리스트에-유저가-추가될-때-추가된-유저의-위치를-따라-스크롤하기)

### 유저의 id를 path parameter로 사용해서 동적 라우팅하기

`react-rouder-dom`을 이용해서 `userId`를 파라미터 값으로 사용할 수 있도록 구조를 만들었습니다.

```tsx
// router.tsx
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route path="/" element={<Home />} />
      <Route errorElement={<ErrorBoundary userError />}>
        <Route path="/user" element={<User />} />
        <Route path="/user/:userId" element={<UserDetail />} />
      </Route>
    </Route>,
  ),
);
```

사용하는 곳에서 `react-router-dom`의 `useParams` 함수를 이용해서 `id`가 일치하는 유저를 화면에 보여줄 수 있도록 만들었습니다. 만약 `id`가 일치하는 유저를 찾지 못한다면 사용자에게 에러 페이지를 보여줍니다.

```tsx
// UserDetail.tsx
const UserDetail = () => {
  const { userId } = useParams();
  const users = useAppSelector((state) => state.initialUsers);
  const user = users.find(({ id }) => id === Number(userId));

  return user ? (
    <Container>
      <Profile user={user} fullWidth />;
    </Container>
  ) : (
    <ErrorBoundary userError />
  );
};
```

[⬆️ Back to top](#목차)
<br />

### scroll bar, input, select 박스 구현하기

#### scroll bar

`::-webkit-scrollbar`를 이용해서 스크롤 바의 색과 디자인을 커스텀 할 수 있었습니다.

<details><summary><b>코드 보기</b></summary><div markdown="1">

```css
&::-webkit-scrollbar {
  width: 5px;
  background: rgba(0, 0, 0, 0);
}

&::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}

&::-webkit-scrollbar-thumb {
  width: 4px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.gray};
}
```

</div></details>

#### input(checkbox)

기존에는 직접 `input` 태그를 사용하고 라벨과 `onChange`를 사용해서 구현했습니다. 이 방식이 웹 접근성과 시맨틱 태그를 사용하는 것에 더 적합한 방식이라고 생각했지만, 문제가 있었습니다.

목록의 아이템을 클릭했을 때, 아이템의 `checked`값과 이 `input`의 `checked`값은 같은 값인데 아이템에서 `checked`값을 핸들링하는 `onClick`과 `input`에서의 `onChange` 두 핸들러를 조절하는 것보다 간단한 방법을 찾고자 했습니다.

그래서 div태그를 통해 간단하게 구현했지만, Checkbox 자체만으로는 토글 기능이 없는 컴포넌트가 되고 말아 아쉬운 코드입니다.

<details><summary><b>코드 보기</b></summary><div markdown="1">

```tsx
// 기존 코드
const Checkbox = ({ id, checked, onChange, ...rest }: CheckboxProps) => {
  return (
    <Label htmlFor={id}>
      <Input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <Check /> // SVG
    </Label>
  );
};
```

```tsx
// 현재 코드
const Checkbox = ({ checked }: CheckboxProps) => {
  return (
    <Container>
      {' '}
      // DIV
      <Box checked={checked} /> // DIV
      <Check /> // SVG
    </Container>
  );
};
```

</div></details>

#### selectbox

구현할 때, 고민이 많이 들었던 친구입니다. 상태를 정렬해야 하는데, 이를 selectbox 컴포넌트 내부에서 진행해도 될지, 상위에서 진행해야 할지 고민이 많이 들었지만, 외부에서 전달하고자하면 props drilling이 많이 일어나 내부에서 진행하기로 결정했습니다.

이 selectbox를 클릭하면 열리고 닫힐 때에 drop box처럼 부드럽게 흘러내려 나오도록하는 효과를 주었는데, 적절한 `height` 값을 찾기 위해 고민했습니다.

또, 외부를 클릭해도, 이게 닫힐 수 있게 하기 위해 처음에는 이 selectbox보다 `z-index`를 낮게 준 태그 하나를 화면 전체에 깔아서 클릭 시 닫히게 만들었었습니다. 그러나 이게 두 개가 화면에 같이 존재하면서 다른 곳이 클릭이 안되버리는 알 수 없는 오류가 발생했습니다.

그래서 `useDrawer`라는 커스텀 훅을 만들고, 리액트의 `ref` 를 이용해 이 요소를 선택하고, 요소 내부의 자식 요소가 아닌 다른 요소를 클릭하면 닫힐 수 있도록 만들었습니다.

<details><summary><b>코드 보기</b></summary><div markdown="1">

```tsx
const useDrawer = <T extends HTMLElement>(
  drawerRef: React.RefObject<T>,
): [boolean, () => void] => {
  const [isOpen, toggleDrawer] = useToggle(false);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!isOpen) {
        return;
      }

      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as HTMLElement)
      ) {
        toggleDrawer();
      }
    },
    [drawerRef, isOpen, toggleDrawer],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerRef, isOpen, toggleDrawer, handleClickOutside]);

  return [isOpen, toggleDrawer];
};
```

</div></details>

<br />

[⬆️ Back to top](#목차)
<br />

### json-server를 통해 mock 데이터(user_data.json) 사용하기

json-server를 통해서 임시 서버를 만들고, http 요청을 주고 받는 코드를 만들 수 있었습니다. 그러나 `user_data.json`의 수정이 필요했습니다.

기존의 데이터를 받아오고, 사용하는데에는 지장이 없었지만, **저장하기** 버튼을 클릭했을 때, `user_data.json`에 변경 저장되는 기능을 구현하고 싶었기 때문입니다.

axios를 통해 patch요청(변경된 부분만 업데이트 하기 위해)을 보내보는데, 계속 문제가 생겼습니다. 아예 반응하지 않거나, 요청 `url`을 조금 수정하면 데이터가 완전히 뒤죽박죽이 되어버렸기 때문입니다.

그리고 또 하나의 큰 문제는 제대로 된 `url`로 데이터를 변경 저장하기 위해서는 각 유저 데이터 하나마다 요청을 보내고, `Promise.all()`을 통해서 처리해야 했습니다. 유저의 체크 값은 굉장히 자주 바뀔 주요 상태이기 때문에, 서버에 부담이 갈 수 있어 `user_data.json`을 수정했습니다.

<details><summary><b>코드 보기</b></summary><div markdown="1">

```json
{
  "users": {
    "data": [
      {
        "id": 1,
        "name": "Pororo",
        "date": "1984-02-23",
        "comment": "I like to play.",
        "image": "1.png",
        "checked": true
      },
      {
        "id": 2,
        "name": "Apple Kim",
        "date": "1995-01-12",
        "comment": "This is innovation.",
        "image": "2.png",
        "checked": false
      }
      //...
    ]
  }
}
```

또, 이 데이터를 처음 데이터 로딩 시에만 사용하고, 그 외에는 redux에서 관리할 수 있도록 App이 실행되면 useEffect를 통해 위 데이터를 dispatch하게 만들었습니다.

</div></details>

<br />

[⬆️ Back to top](#목차)
<br />

### 오름차순, 내림차순 정렬하기

유저를 날짜 기준으로 오름차순, 내림차순으로 정렬하기 위해서 유틸 함수를 만들었습니다. 이 함수는 유저들을 담은 배열과 어떤 순으로 정렬할지에 대한 정렬방식, 두 가지를 매개변수로 받습니다.

처음에는 코드를 더 깔끔하게 작성하고 싶어서, 유저를 날짜 기준으로 정렬한 후에 이름을 기준으로 한번 더 정렬하게 만들었지만, 유저의 수가 많다면 반복의 수가 적은 편이 더 좋을거라 생각하여 한 번만 정렬 작업을 수행하기로 했습니다.

날짜끼리 비교연산을 하기 위해서 `new Date(data).getTime()`을 사용할 수 있었습니다.

[⬆️ Back to top](#목차)
<br />

### 두 개의 유저 목록 만들기

<img width="730" alt="유저 목록" src="https://user-images.githubusercontent.com/68905615/211231069-4ba66bc5-b224-417e-b999-7f07036dbe14.png"><br/>

가장 고민을 많이 했던 부분인 것 같습니다. 각 목록에서 어디든지 유저를 클릭하면 양쪽 모두 `checked`값이 변경되어야 했기 때문에 하나의 상태를 가져야할까, 여러 개의 상태를 가져야할까 고민했습니다.

처음에는 하나의 상태를 통해서 다루려고 했지만, 정렬 기능에서 문제가 있었습니다. 한쪽을 정렬하면 양쪽 모두 정렬되어 버리는 문제가 있었습니다. 그래서 "컴포넌트 내부에 새로운 상태를 만들어서 체크시마다 일일히 유저를 비교할까?"도 고민했지만, 체크된 유저들만을 가진 배열을 상태로 만들어 store에서 관리하는게 좋을 것 같다고 판단되어 두 개의 상태를 다루기로 결정했습니다.

```ts
// 유저를 클릭하면 checked 값을 변경해주는 기능
checkUser(state, action: PayloadAction<Pick<User, 'id'>>) {
  // id가 같은 유저의 인덱스 찾기
  const index = state.users.findIndex(({ id }) => id === action.payload.id);

  // 유저가 없다면 그대로 반환
  if (index === -1) {
    return;
  }

  // 현재 유저의 체크값 변경
  const currentUser = state.users[index];
  currentUser.checked = !currentUser.checked;

  // 현재 유저의 체크 상태 여부에 따라 해당 유저를 배열에서 추가 제거
  if (currentUser.checked) {
    state.checkedUsers = state.users.filter((user) => user.checked);
  } else {
    state.checkedUsers = state.checkedUsers.filter((user) => user.id !== currentUser.id);
  }
},
```

이를 통해 각각의 정렬이 가능하고, 간결한 코드로 두 개의 유저 목록을 화면에 그려낼 수 있었습니다. [전체 코드 보러가기](https://github.com/brad-go/nara-space-frontend-assignment/blob/acaf01b5cfde6ddb9dda028e5a987cd9b157f0c0/src/store/usersSlice.ts#L24)

[⬆️ Back to top](#목차)
<br />

### 오른쪽 리스트에 유저가 추가될 때, 추가된 유저의 위치를 따라 스크롤하기

또, 개인적으로 신경쓴 부분은 오른쪽 리스트에 체크된 유저가 추가되는 위치입니다. 체크된 유저가 스크롤이 생길만큼 있을 때, 순서가 달라 **화면 밖에 추가되면 사용자는 체크가 된 것인지 고민할 것**입니다.

그래서 유저가 체크되면서 오른쪽 리스트에 추가될 때, 체크된 유저를 향해 스크롤이 일어날 수 있도록 기능을 추가했습니다.

```tsx
const listRef = useRef<HTMLUListElement>(null);

const scrollToElement = useCallback(() => {
  if (!withButton || !listRef.current || !selectedUser) {
    return;
  }

  const LIST_ITEM_HEIGHT = 40; // 아이템의 높이
  const index = checkedUsers.findIndex(({ id }) => id === selectedUser.id); // 유저 인덱스 찾기
  const position = index * LIST_ITEM_HEIGHT; // 인덱스 * 요소의 높이 만큼

  // 현재 요소만큼 스크롤하기
  listRef.current.scrollTo({
    top: position,
    behavior: 'smooth',
  });
}, [checkedUsers, selectedUser, withButton]);
```

[⬆️ Back to top](#목차)
<br />

## :open_file_folder: 5. 디렉토리 구조

```bash
.
├── public
├── server
└── src
    ├── assets
    │   ├── fonts
    │   ├── images
    │   └── svgs
    ├── components
    │   ├── checkbox
    │   ├── clock
    │   ├── header
    │   ├── layout
    │   ├── list
    │   ├── profile
    │   └── selectbox
    ├── constants
    ├── hooks
    ├── pages
    │   ├── home
    │   └── user
    ├── services
    ├── store
    ├── styles
    ├── types
    └── utils

```

[⬆️ Back to top](#목차)
<br />

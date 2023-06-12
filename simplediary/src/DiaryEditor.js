import { useState } from "react";

const DiaryEditor = () => {
  //1. DOM에 접근할 때
  //2. 렌더 사이에서 값을 기억할 때
  // 렌더사이에서 값이 유지되는 ref 객체를 반환한다.
  // 자바스크립트 객체를 만드는 것과 유사하다.
  /*
  ref 객체란 무엇인가? 
  ref 객체란 렌더링 간에 값을 유지하는 용도로 사용
  react는 react컴포넌트의 상태가 변경될 때마다 렌더링이 일어난다.
  상태가 변경될 때마다 컴포넌트의 출력이 최신 상태를 반영하도록 하기 위함
  상태를 변경해도 컴포넌트가 다시 그려지는 것이 불필요하거나, 심지어는 불필요한 연산을 통해 성능에 문제를 주기도 합니다. 
  useRef() 함수를 사용하여 ref객체로 값을 반환하면서 
  리랜더링을 방지하며 상태 변경 없이 컴포넌트 사이에서 값이 유지되어야 하는 경우에 사용합니다. 
  생성된 ref객체는 생명주기 동안 동일하게 유지되며 변경되어야 하는 경우 .current 프로퍼티를 통해 값을 변경합니다. 
  */
  const authorInput = useRef();
  const contentInput = useRef();

  // 하나의 state로 묶어주기
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });
  //   const [author, setAuthor] = useState("");
  //   const [content, setContent] = useState("");

  // 각 요소에 선언해주던 state를 또 하나의 함수로 묶기
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    console.log(e);
    alert("일기를 저장하였습니다.");
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기장</h2>
      <div>
        <input
          name="author"
          value={state.author}
          onChange={handleChangeState}
          type="text"
          ref={authorInput}
        />
      </div>

      <div>
        <textarea
          name="content"
          type="text"
          /*
          `ref`는 원시적인 HTML DOM API에 접근해야 할 때나 DOM 요소에 직접적인 변경을 가해야 할 때,
           혹은 특정 DOM 요소에 포커스를 주어야 하는 등의 경우에 사용합니다.
          */
          ref={contentInput}
          value={state.content}
          onChange={(e) => {
            // setContent(e.target.vlaue);
            setState({
              // 이렇게 state를 하나로 묶고 값을 할당 할 때 값이 많아지면
              // 무수히 많은 값들을 다 일일히 선언해줘야 한다.
              // 이를 해결하는 방법이 스프레드 연산자
              //   author: state.author,
              ...state,
              content: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장</button>
      </div>
    </div>
  );
};
export default DiaryEditor;

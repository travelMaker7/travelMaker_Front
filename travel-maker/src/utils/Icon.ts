import { styled } from "styled-components";

// 토글 화살표
export const TOGGLEARROW = `<FontAwesomeIcon icon={faChevronRight} style={{color: "#8cc3f8",}} />`;

// 주소 수정 아이콘
export const EDITICON = `<FontAwesomeIcon icon={faPenToSquare} style={{color: "#008cff",}} />`;

// 목록 삭제 아이콘
export const DELETEICON = `<FontAwesomeIcon icon={faTrash} style={{color: "#008ffc",}} />`;

// 일정(Day) 앞에 붙이는 아이콘
export const DAYCLOUDICON = `<FontAwesomeIcon icon={faCloud} style={{color: "#ffffff",}} />`;

// 해 모양은 mui icons에서 직접 import 해오기

// 숫자 아이콘

export const NUBMERICON = styled.div`
  width: 1.5625rem;
  height: 1.5625rem;
  border-radius: 100%;
  text-align: center;
  line-height: 1.5625rem;
  color: white;
  background-color: green;
`

//지도 모양 아이콘
export const MAPICON = `<FontAwesomeIcon icon={fa-solid fa-map} style={{color: "#6FADFF",}} />`;

//시계 아이콘
export const CLOCKICON = `<FontAwesomeIcon icon={fa-solid fa-clock} style={{color: "#6FADFF",}} />`;

//사람 아이콘
export const PEOPLEICON = `<FontAwesomeIcon icon={fa-solid fa-people-line} style={{color: "#6FADFF",}} />`;

//달력 아이콘
export const CALENDARICON = `<FontAwesomeIcon icon={fa-solid fa-calendar} style={{color: "#6FADFF",}} />`;










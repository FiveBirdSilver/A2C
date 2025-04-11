// 전체 게시글 리스트 타입 정의
export interface IPostList {
  images: string[]
  location: {
    point: string
    type: string
    coordinates: number[]
  }
  _id: string
  title: string
  type: string
  content: string
  contentType: string
  commentCount: number
  viewCount: number
  heartCount: number
  priceType: string
  price: string
  author: {
    nickname: string
  }
  createdAt: string
  updatedAt: string
  __v: string
}

// 상세 게시글 타입 정의
export interface IPostDetail {
  cookie: string | null
  isLiked: boolean
  data: {
    images: string[]
    location: {
      point: string
      coordinates: number[]
    }
    _id: string
    title: string
    type: string
    content: string
    contentType: string
    chatCount: number
    viewCount: number
    heartCount: number
    price: string
    author: {
      nickname: string
    }
    createdAt: string
    updatedAt: string
    comments: {
      _id: string
      content: string
      board: string
      parentCommentId: string
      createdAt: string
      updatedAt: string
      author: {
        nickname: string
      }
    }[]
  }
}

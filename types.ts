
export interface Product {
  id: string;
  name: string;
  series: string;
  description: string;
  image: string;
  price: number;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum AromaSeries {
  CALM = '雷雨安',
  EASE = '暂别安',
  PEACE = '出行安',
  NEST = '窝窝安'
}

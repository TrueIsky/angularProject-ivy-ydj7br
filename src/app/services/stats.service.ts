import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor() {}

  clicks: number = 0;
  characters: number = 0;
  loginTime: Date;
  numberOfChats: number = 0;

  reset(): void {
    this.clicks = 0;
    this.characters = 0;
    this.loginTime = null;
    this.numberOfChats = 0;
  }

  addClick(): void {
    this.clicks += 1;
  }

  addChats(): void {
    this.numberOfChats += 1;
  }

  addCharacters(text: string): void {
    this.characters += text.length;
  }

  setCurrentTime(): void {
    this.loginTime = new Date();
  }

  getTimeDifference(): string {
    let currentTimestamp = new Date();
    let milliseconds = currentTimestamp.getTime() - this.loginTime.getTime();

    let seconds = Math.floor(milliseconds / 1000) % 60;
    let minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    let hours = Math.floor(milliseconds / (1000 * 60 * 60));

    return `${hours}:${minutes}:${seconds}`;
  }
}

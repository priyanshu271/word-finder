import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchWordsInfoService } from '../../services/search-words-info.service';
import { Meaning, WordData } from '../../models/word-info.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-word',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './search-word.component.html',
  styleUrl: './search-word.component.scss'
})
export class SearchWordComponent {
  public wordSearchForm: FormGroup;
  public wordInfo: WordData[] = [];
  public meaningsInfo: Meaning[] = [];
  public displayWord: string ='';
  public phonetic: string='';
  public phoneticSound:string='';
  public seeMoreDef:boolean=false;
  public seeLessDef:boolean=false;
  public dispPartOfSpeech: string='';
  public requiredErrorFlag: boolean = false;
  public invalidWord:boolean = false;
  public expandedPartOfSpeech: { [key: string]: boolean } = {}; // Object to track expanded state for each part of speech

  /**
   * Constructor
   * 
   * @param formBuilder 
   * @param wordSearchService 
   */
  public constructor(public formBuilder: FormBuilder, public wordSearchService: SearchWordsInfoService) {
    this.wordSearchForm = this.formBuilder.group({
      enteredWord: ['', Validators.required]
    });
  }

  public onWordSearch() {
    if(!this.wordSearchForm.valid){
      this.requiredErrorFlag = true;
      this.meaningsInfo = [];
    } else {
      this.requiredErrorFlag = false;
    this.wordInfo = [];
    this.meaningsInfo = [];
    const wordName = this.wordSearchForm.controls['enteredWord'].value;
    this.wordSearchService.getWordInfo(wordName).subscribe((data: WordData[]) => {
      this.invalidWord = false;
      this.wordInfo.push(...data);
      this.displayWord = this.wordInfo[0].word;
      this.phonetic = this.wordInfo[0].phonetic;
      this.phoneticSound = this.wordInfo[0].phonetics[0].audio;
      this.processWordData();
    },error =>{
      this.invalidWord = true;
    });
  }
  }

  public processWordData() {
    const wordInfoLength = this.wordInfo.length;
    const meaningsLength = this.wordInfo[0].meanings.length;

    const minLength = Math.min(wordInfoLength, meaningsLength);

    for (let i = 0; i < minLength; ++i) {
      this.meaningsInfo.push(this.wordInfo[0].meanings[i]);
    }

    if (meaningsLength > wordInfoLength) {
      for (let i = minLength; i < meaningsLength; ++i) {
        this.meaningsInfo.push(this.wordInfo[0].meanings[i]);
      }
    }
  }

  /**
   * See more definitions
   * 
   * @param event 
   */
  public seeMoreDefinitions(event:any){
    this.expandedPartOfSpeech[event] = true; // Set expanded state for the specific part of speech
  }

  public seeLess(event:any){
    this.expandedPartOfSpeech[event] = false; // Set collapsed state for the specific part of speech
  }

  public isExpanded(partOfSpeech: string): boolean {
    return !!this.expandedPartOfSpeech[partOfSpeech]; // Check if the part of speech is expanded
  }
}
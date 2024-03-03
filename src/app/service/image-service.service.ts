import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient) { }


  getUsers() {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };



    return this.http.get('/api/users/me', _options)
  }
  uploadImage(file: any, description: string, category: any, title: any, type: any, descriptionDifLang: any, titleDifLang: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };

    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('type', type);
    formData.append('title', title);
    formData.append('titleDifLang', JSON.stringify(titleDifLang));
    formData.append('descriptionDifLang', JSON.stringify(descriptionDifLang));

    return this.http.post('/api/img/upload', formData, _options);
  }

  getCategory(lang: any) {
    return this.http.get('/api/img/categories', { params: { lang: lang } });

  }
  addCategory(category: any, title: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('/api/img/add-category', { category, title }, _options);

  }

  getPost(category: any) {

    return this.http.get('/api/img/post-category/' + category, { params: { lang: 'tamil' } });
  }

  like(postId: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.post('/api/img/likes', { postId }, _options)
  }

  share(postId: any) {
    return this.http.post('/api/img/share', { postId }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  commet(postId: any, comment: any) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('/api/img/add-comment', { postId, comment }, _options)
  }


  upload(file: any, state1: any[], state2: any[], state3: any[], result: any[]) {
    console.log(file, state1, state2, state3);
    const formData = new FormData();

    formData.append('question', file);

    state1.forEach((stateFile) => {
      formData.append('state1', stateFile.option);
    });

    state2.forEach((stateFile) => {
      formData.append(`state2`, stateFile.option);
    });

    state3.forEach((stateFile) => {
      formData.append(`state3`, stateFile.option);
    });
    result.forEach((resFile) => {
      formData.append(`answer`, resFile.resultImg);
    });


    this.http.post('/api/quizzes/upload', formData).subscribe((data: any) => {
      console.log(data);
      data.state1.forEach((state: any, index: number) => {
        state1[index]['option'] = state;
      });
      data.state2.forEach((state: any, index: number) => {
        state2[index]['option'] = state;
      });
      data.state3.forEach((state: any, index: number) => {
        state3[index]['option'] = state;
      });

      data.answer.forEach((state: any, index: number) => {
        result[index]['resultImg'] = state;
      });


      this.http.post("/api/quizzes/add-quizze", { state1, state2, state3, question: data.question[0], result }).subscribe(data1 => {
        console.log(data1);
      })

    });
  }

  getQuizzes() {
    return this.http.get('/api/quizzes/get-all-quizzes');
  }

  result(quizze_id: any, score: number) {
    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };
    return this.http.post('/api/quizzes/get-result', { score, quizze_id }, _options)
  }

}

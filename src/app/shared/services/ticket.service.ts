import { Injectable, inject } from "@angular/core";
import { Http } from "./http.service";
import { Observable } from "rxjs";
import { Ticket } from "@shared/interfaces/ticket.interface";



@Injectable({
  providedIn: 'root',
})
export class TicketService {
  public route: string = '/tickets';

  private http = inject(Http)

  public gerarTicket(ticket: Ticket): Observable<boolean> {
    return this.http.post(`${this.route}`, ticket);
  }

}

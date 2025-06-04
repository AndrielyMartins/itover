import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../backend/Service/user.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
  standalone: false
})
export class UserListPage implements OnInit {
  users: any[] = [];

  constructor(
    private userService: UserService, 
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Método para carregar usuários
  loadUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });
  }

  // Método para deletar um usuário
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        console.log('Usuário deletado com sucesso');
        this.loadUsers(); // Recarrega a lista após deletar
      },
      error: (error) => {
        console.error('Erro ao deletar usuário:', error);
      }
    });
  }

  goToUserForm(id?: number) {
    if (id) {
      this.router.navigate(['/user-form', id]);
    } else {
      this.router.navigate(['/user-form']);
    }
  }

  async toggleMenu() {
    await this.menuCtrl.toggle();
  }
}

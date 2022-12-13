import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Routing
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';

//COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';

//SERVICES
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';

//TOAST NOTIFICATION
import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserEditComponent,
    SidebarComponent,
    TimelineComponent,
    PostsComponent,
    ProfileComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    MomentModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
      appRoutingProviders,
      UserService,
      UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModuleInfo } from './moduleinfo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Input() unViewedCommentsCount: number;
  @Input() moduleChanged: any;
  allModules: ModuleInfo[] = [];
  assistantModules: ModuleInfo[] = [];
  cDEModules: ModuleInfo[] = [];
  dSIModules: ModuleInfo[] = [];
  selectedModule: ModuleInfo;
  searchText: string;
  @Output() pageChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.searchText = '';
    this.allModules = this.getAllModules();
    if (this.allModules !== undefined && this.allModules.length > 0) {
      this.splitModules(this.allModules);
    }   
  }

  splitModules(modules) {
    this.assistantModules = modules.filter(i => i.moduleType === '1');
    this.cDEModules = modules.filter(i => i.moduleType === '2');
    this.dSIModules = modules.filter(i => i.moduleType === '3');
    if (this.assistantModules.length > 0) {
      this.setSelectedModule(this.assistantModules[0]);
    } else if (this.cDEModules.length > 0) {
      this.setSelectedModule(this.cDEModules[0]);
    } else if (this.dSIModules.length > 0) {
      this.setSelectedModule(this.dSIModules[0]);
    }
  }

  filterModules() {
    if (this.searchText !== '') {
      const modules = this.allModules.filter(i =>
        i.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 ||
        i.version.indexOf(this.searchText.toLowerCase()) > -1
      );
      this.splitModules(modules);
    } else {
      this.splitModules(this.allModules);
    }
  }

  getCssClassIfSelected(module: ModuleInfo): string {
    if (this.selectedModule !== undefined && module.id === this.selectedModule.id) {
      return ' active';
    }
    return '';
  }

  getModuleCommentsCount(id: string): any {
    return this.selectedModule.commentsCount;
  }

  setPage() {
  }

  setSelectedModule(module: ModuleInfo) {
     this.selectedModule = module;
  }

  emptySelectedModule() {
    this.selectedModule = undefined;
  }

  canAccessCdeModules(): boolean {
    return (this.cDEModules !== undefined && this.cDEModules.length) > 0 ;
  }

  private getAllModules(): ModuleInfo[] {
    const module = new ModuleInfo();
    module.id = "1";
    module.name = "Test Module";
    module.displayName = "Test Module";
    module.moduleType = "1";
    module.publishStatus = "1"
    module.version = "3.0";
    this.allModules.push(module);

    return this.allModules;
  }
}
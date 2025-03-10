import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Channel } from '../../../../../../shared/channel.interface';
import { SettingsComponent } from '../../../../settings/settings.component';
import { updateFavorites } from '../../../../state/actions';
import {
    selectActivePlaylistId,
    selectFavorites,
    selectIsEpgAvailable,
} from '../../../../state/selectors';

@Component({
    imports: [
        AsyncPipe,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatTooltipModule,
        TranslateModule,
        MatDialogModule,
    ],
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    @Input() activeChannel!: Channel;
    @Output() multiEpgClicked = new EventEmitter<void>();
    @Output() toggleLeftDrawerClicked = new EventEmitter<void>();
    @Output() toggleRightDrawerClicked = new EventEmitter<void>();

    favorites$ = this.store.select(selectFavorites);
    isEpgAvailable$ = this.store.select(selectIsEpgAvailable);
    playlistId$ = this.store.select(selectActivePlaylistId);

    constructor(
        private snackBar: MatSnackBar,
        private store: Store,
        private translateService: TranslateService,
        private dialog: MatDialog
    ) {}

    /**
     * Adds/removes a given channel to the favorites list
     * @param channel channel to add
     */
    addToFavorites(channel: Channel): void {
        this.snackBar.open(
            this.translateService.instant('CHANNELS.FAVORITES_UPDATED'),
            null,
            { duration: 2000 }
        );
        this.store.dispatch(updateFavorites({ channel }));
    }

    openSettings(): void {
        this.dialog.open(SettingsComponent, {
            width: '1000px',
            height: '90%',
            data: { isDialog: true },
        });
    }
}

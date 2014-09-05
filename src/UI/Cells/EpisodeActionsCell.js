'use strict';

define(
    [
        'vent',
        'Cells/NzbDroneCell',
        'Commands/CommandController'
    ], function (vent, NzbDroneCell, CommandController) {
        return NzbDroneCell.extend({

            className: 'episode-actions-cell',

            events: {
                'click .x-automatic-search' : '_automaticSearch',
                'click .x-manual-search'    : '_manualSearch'
            },

            render: function () {
                this.$el.empty();

                this.$el.html(
                    '<i class="icon-search x-automatic-search" title="Automatic Search"></i>' +
                    '<i class="icon-nd-manual-search x-manual-search" title="Manual Search"></i>'
                );

                CommandController.bindToCommand({
                    element: this.$el.find('.x-automatic-search'),
                    command: {
                        name       : 'episodeSearch',
                        episodeIds : [ this.model.get('id') ]
                    }
                });

                this.delegateEvents();
                return this;
            },

            _automaticSearch: function () {
                CommandController.Execute('episodeSearch', {
                    name       : 'episodeSearch',
                    episodeIds : [ this.model.get('id') ]
                });
            },

            _manualSearch: function () {
                vent.trigger(vent.Commands.ShowEpisodeDetails, { episode: this.cellValue, hideSeriesLink: true, openingTab: 'search' });
            }
        });
    });

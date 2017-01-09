let root = {
    google : {
        protobuf : {
            Timestamp: {
                _create: function(){
                    return {
                        seconds: 64,
                        nanos: 32
                    }
                }
            }
        }
    },
    itunes_appstore_project : {
        ServiceType: {
            _create: function(){ return 1; }
        },
        Error: {
            _create: function(){ return 1; }
        },
        PublicProjectCreated: {
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    source_language_id: 64,
                    target_language_ids: [64, 64],
                    app_name: 'dummy_string',
                    description: 'dummy_string',
                    whats_new: 'dummy_string',
                    credential_id: 'dummy_string',
                    organization_id: 'dummy_string'
                }
            }
        },
        SourceCreated: {
            Translation: {
                _create: function(){
                    return {
                        id: 'dummy_string',
                        string: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    translation_ids: ['dummy_string', 'dummy_string'],
                    total_word_count: 32,
                    source_language_id: 64,
                    target_language_ids: [64, 64],
                    app_name: root.itunes_appstore_project.SourceCreated.Translation._create(),
                    description: root.itunes_appstore_project.SourceCreated.Translation._create(),
                    whats_new: root.itunes_appstore_project.SourceCreated.Translation._create(),
                    source_id: 'dummy_string'
                }
            }
        },
        PublicProjectLanguagesAdded: {
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    language_ids: [64, 64]
                }
            }
        },
        PublicProjectOrderConfirmed: {
            _create: function(){
                return {
                    order_id: 'dummy_string',
                    quotation_id: 'dummy_string'
                }
            }
        },
        PublicProjectNameUpdated: {
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    original_project_name: 'dummy_string',
                    updated_project_name: 'dummy_string'
                }
            }
        },
        PublicProjectDeleted: {
            _create: function(){
                return {
                    project_id: 'dummy_string'
                }
            }
        },
        PublicProjectSourceUpdated: {
            Translation: {
                _create: function(){
                    return {
                        id: 'dummy_string',
                        string: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    source_language_id: 64,
                    app_name: root.itunes_appstore_project.PublicProjectSourceUpdated.Translation._create(),
                    description: root.itunes_appstore_project.PublicProjectSourceUpdated.Translation._create(),
                    whats_new: root.itunes_appstore_project.PublicProjectSourceUpdated.Translation._create(),
                    imported_at: root.google.protobuf.Timestamp._create(),
                    source_id: 'dummy_string'
                }
            }
        },
        AppStoreMetaDataUpdated: {
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    app_store_url: 'dummy_string',
                    icon_url: 'dummy_string',
                    version: 'dummy_string'
                }
            }
        },
        ProjectNotesLeft: {
            IAPNote: {
                _create: function(){
                    return {
                        product_id: 'dummy_string',
                        display_name: 'dummy_string',
                        description: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    app_name_note: 'dummy_string',
                    description_note: 'dummy_string',
                    whats_new_note: 'dummy_string',
                    keyword_note: 'dummy_string',
                    iaps_note: root.itunes_appstore_project.ProjectNotesLeft.IAPNote._create()
                }
            }
        },
        OrderItemDelivered: {
            _create: function(){
                return {
                    order_id: 'dummy_string',
                    to_language_id: 64,
                    project_id: 'dummy_string'
                }
            }
        },
        ProjectLanguagesRemoved: {
            _create: function(){
                return {
                    occurred_on: root.google.protobuf.Timestamp._create(),
                    project_id: 'dummy_string',
                    user_id: 'dummy_string',
                    deleted_language_ids: [64, 64]
                }
            }
        },
        PublicProjectBackupFinished: {
            _create: function(){
                return {
                    backup_id: 'dummy_string',
                    project_id: 'dummy_string',
                    backup_at: root.google.protobuf.Timestamp._create()
                }
            }
        },
        PublicProjectItunesConnectConnected: {
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    credential_id: 'dummy_string'
                }
            }
        },
        ItunesConnectProjectDisconnected: {
            _create: function(){
                return {
                    project_id: 'dummy_string'
                }
            }
        },
        TranslationCreated: {
            _create: function(){
                return {
                    Translation_id: 'dummy_string',
                    language_id: 64,
                    last_updated_at: root.google.protobuf.Timestamp._create(),
                    project_id: 'dummy_string'
                }
            }
        },
        HotFixReimportTranslations: {
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    source_language_id: 64,
                    language_ids: [64, 64]
                }
            }
        },
        ItunesProjectExportStarted: {
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    export_user_id: 'dummy_string',
                    organization_id: 'dummy_string',
                    custom_version_number: 'dummy_string',
                    export_language_ids: [64, 64]
                }
            }
        },
        ItunesProjectExported: {
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    project_name: 'dummy_string',
                    export_user_id: 'dummy_string',
                    organization_id: 'dummy_string',
                    export_language_ids: [64, 64],
                    exported_at: root.google.protobuf.Timestamp._create()
                }
            }
        },
        ItunesProjectExportFailed: {
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    project_name: 'dummy_string',
                    export_user_id: 'dummy_string',
                    organization_id: 'dummy_string',
                    export_language_ids: [64, 64],
                    errors: ['dummy_string', 'dummy_string'],
                    exported_at: root.google.protobuf.Timestamp._create()
                }
            }
        },
        TranslationReimported: {
            _create: function(){
                return {
                    Translation_id: 'dummy_string',
                    language_id: 64,
                    last_updated_at: root.google.protobuf.Timestamp._create(),
                    project_id: 'dummy_string'
                }
            }
        },
        KeywordPoolSelectionUpdated: {
            _create: function(){
                return {
                    id: 'dummy_string',
                    project_id: 'dummy_string',
                    translation_id: 'dummy_string',
                    language_id: 64,
                    selected_keyword_string: 'dummy_string'
                }
            }
        },
        KeywordPoolImported: {
            _create: function(){
                return {
                    id: 'dummy_string',
                    project_id: 'dummy_string',
                    translation_id: 'dummy_string',
                    language_id: 64,
                    keyword_string: 'dummy_string'
                }
            }
        },
        AppInfo: {
            _create: function(){
                return {
                    id: 'dummy_string',
                    name: 'dummy_string',
                    icon_url: 'dummy_string',
                    description: 'dummy_string',
                    version: 'dummy_string',
                    whats_new: 'dummy_string',
                    store_url: 'dummy_string'
                }
            }
        },
        Project: {
            _create: function(){
                return {
                    id: 'dummy_string',
                    name: 'dummy_string'
                }
            }
        },
        SearchRequest: {
            _create: function(){
                return {
                    query: 'dummy_string'
                }
            }
        },
        SearchResponse: {
            _create: function(){
                return {
                    apps: root.itunes_appstore_project.AppInfo._create()
                }
            }
        },
        ProjectSummary: {
            Order: {
                _create: function(){
                    return {
                        order_id: 'dummy_string',
                        status: 32
                    }
                }
            },
            _create: function(){
                return {
                    id: 'dummy_string',
                    name: 'dummy_string',
                    type: 'dummy_string',
                    from_language_ids: [64, 64],
                    to_language_ids: [64, 64],
                    orders: root.itunes_appstore_project.ProjectSummary.Order._create()
                }
            }
        },
        LookupApp: {
            Request: {
                _create: function(){
                    return {
                        url: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        app: root.itunes_appstore_project.AppInfo._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        UpdateProjectSourceFromAppStore: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        app_id: 'dummy_string',
                        app_store_url: 'dummy_string',
                        icon_url: 'dummy_string',
                        version: 'dummy_string',
                        app_name: 'dummy_string',
                        description: 'dummy_string',
                        whats_new: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        result: root.itunes_appstore_project.UpdateProjectSourceFromAppStore.Result._create()
                    }
                }
            },
            Result: {
                _create: function(){
                    return {
                        project_id: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        CreatePublicProject: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string',
                        creatorUser_id: 'dummy_string',
                        app_id: 'dummy_string',
                        app_name: 'dummy_string',
                        app_store_Url: 'dummy_string',
                        source_language_id: 'dummy_string',
                        target_language_ids: ['dummy_string', 'dummy_string'],
                        icon_url: 'dummy_string',
                        description: 'dummy_string',
                        version: 'dummy_string',
                        whats_new: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        project_id: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        CreateITCProject: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        app_id: 'dummy_string',
                        icon_url: 'dummy_string',
                        version: 'dummy_string',
                        app_name: 'dummy_string',
                        description: 'dummy_string',
                        whats_new: 'dummy_string',
                        keyword: 'dummy_string',
                        iaps: root.itunes_appstore_project.InAppPurchase._create(),
                        source_language_id: 'dummy_string',
                        target_language_ids: ['dummy_string', 'dummy_string'],
                        credential_token: 'dummy_string',
                        content_provider_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        project_id: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        InAppPurchase: {
            _create: function(){
                return {
                    product_id: 'dummy_string',
                    display_name: 'dummy_string',
                    description: 'dummy_string'
                }
            }
        },
        GetProjectsByOrganizationId: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        projects: root.itunes_appstore_project.Project._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetProjectOrdersByOrganizationId: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string'
                    }
                }
            },
            Order: {
                _create: function(){
                    return {
                        order_id: 'dummy_string',
                        project_id: 'dummy_string',
                        project_name: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        result: root.itunes_appstore_project.GetProjectOrdersByOrganizationId.Order._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetTranslations: {
            Request: {
                _create: function(){
                    return {
                        order_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        to_language_id: 64
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        source: root.itunes_appstore_project.GetTranslations.Translations._create(),
                        translation: root.itunes_appstore_project.GetTranslations.Translations._create()
                    }
                }
            },
            Translations: {
                _create: function(){
                    return {
                        app_name: 'dummy_string',
                        description: 'dummy_string',
                        whats_new: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetProjectByProjectId: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        organization_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        project_info: root.itunes_appstore_project.ProjectInfo._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        ItunesConnectInfo: {
            _create: function(){
                return {
                    apple_id: 'dummy_string',
                    content_provider_id: 'dummy_string',
                    credential_token: 'dummy_string'
                }
            }
        },
        ProjectInfo: {
            _create: function(){
                return {
                    id: 'dummy_string',
                    name: 'dummy_string',
                    type: 'dummy_string',
                    to_language_ids: ['dummy_string', 'dummy_string'],
                    app_id: 'dummy_string',
                    app_store_icon_url: 'dummy_string',
                    app_store_url: 'dummy_string',
                    itunesConnectInfo: root.itunes_appstore_project.ItunesConnectInfo._create()
                }
            }
        },
        GetTranslationOverview: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        project_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        translation_overview: root.itunes_appstore_project.GetTranslationOverview.TranslationOverview._create()
                    }
                }
            },
            TranslationOverview: {
                _create: function(){
                    return {
                        language_id: 64,
                        word_count: 32,
                        translated_count: 32,
                        outdated_count: 32,
                        in_progress_order_count: 32,
                        lastImportedAt: root.google.protobuf.Timestamp._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetLanguageTranslation: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        project_id: 'dummy_string',
                        language_id: 64
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        translation_details: root.itunes_appstore_project.GetLanguageTranslation.TranslationDetails._create()
                    }
                }
            },
            TranslationDetails: {
                _create: function(){
                    return {
                        translatedCount: 32,
                        wordCount: 32,
                        lastImportedAt: root.google.protobuf.Timestamp._create(),
                        from_language_ids: [64, 64],
                        translations: root.itunes_appstore_project.GetLanguageTranslation.Translations._create()
                    }
                }
            },
            Translations: {
                _create: function(){
                    return {
                        appName: root.itunes_appstore_project.GetLanguageTranslation.Translation._create(),
                        description: root.itunes_appstore_project.GetLanguageTranslation.Translation._create(),
                        whatsNew: root.itunes_appstore_project.GetLanguageTranslation.Translation._create(),
                        keyword: root.itunes_appstore_project.GetLanguageTranslation.Translation._create(),
                        iaps: root.itunes_appstore_project.GetLanguageTranslation.TranslationIap._create()
                    }
                }
            },
            Translation: {
                _create: function(){
                    return {
                        source: 'dummy_string',
                        translation: 'dummy_string',
                        isOutdated: true
                    }
                }
            },
            TranslationIap: {
                _create: function(){
                    return {
                        productId: 'dummy_string',
                        displayName: root.itunes_appstore_project.GetLanguageTranslation.Translation._create(),
                        description: root.itunes_appstore_project.GetLanguageTranslation.Translation._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetProjectsSummaryByOrganizationId: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        projects: root.itunes_appstore_project.ProjectSummary._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetProjectSummary: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        project: root.itunes_appstore_project.ProjectSummary._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetProjectSourceByProjectId: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        organization_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        project_source: root.itunes_appstore_project.GetProjectSourceByProjectId.ProjectSource._create()
                    }
                }
            },
            ProjectSource: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        imported_at: root.google.protobuf.Timestamp._create(),
                        name: root.itunes_appstore_project.GetProjectSourceByProjectId.Source._create(),
                        description: root.itunes_appstore_project.GetProjectSourceByProjectId.Source._create(),
                        whatsnew: root.itunes_appstore_project.GetProjectSourceByProjectId.Source._create(),
                        keyword: root.itunes_appstore_project.GetProjectSourceByProjectId.Source._create(),
                        iaps: root.itunes_appstore_project.GetProjectSourceByProjectId.IAP._create()
                    }
                }
            },
            IAP: {
                _create: function(){
                    return {
                        product_id: 'dummy_string',
                        display_name: root.itunes_appstore_project.GetProjectSourceByProjectId.Source._create(),
                        description: root.itunes_appstore_project.GetProjectSourceByProjectId.Source._create()
                    }
                }
            },
            Source: {
                _create: function(){
                    return {
                        source: 'dummy_string',
                        notes: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        UpdateProjectName: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        project_id: 'dummy_string',
                        project_name: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        project_id: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        DeleteProject: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        project_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        project_id: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetProjectStatusByProjectId: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        result: root.itunes_appstore_project.GetProjectStatusByProjectId.Result._create()
                    }
                }
            },
            Result: {
                _create: function(){
                    return {
                        hasOrderInProgress: true
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        LeaveNotes: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        notes: root.itunes_appstore_project.ProjectNotes._create()
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        project_id: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetTranslationFileUrl: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        project_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        result: root.itunes_appstore_project.GetTranslationFileUrl.Result._create()
                    }
                }
            },
            Result: {
                _create: function(){
                    return {
                        file_url: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        AddLanguages: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        project_id: 'dummy_string',
                        language_ids: [64, 64]
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        result: root.itunes_appstore_project.AddLanguages.Result._create()
                    }
                }
            },
            Result: {
                _create: function(){
                    return {
                        language_ids: [64, 64]
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        RemoveLanguages: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        project_id: 'dummy_string',
                        language_ids: [64, 64]
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        result: root.itunes_appstore_project.RemoveLanguages.Result._create()
                    }
                }
            },
            Result: {
                _create: function(){
                    return {
                        language_ids: [64, 64]
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        BackupProject: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        project_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        result: root.itunes_appstore_project.BackupProject.Result._create()
                    }
                }
            },
            Result: {
                _create: function(){
                    return {
                        backup_id: 'dummy_string',
                        project_id: 'dummy_string',
                        version: 'dummy_string',
                        language_ids: [64, 64],
                        file_url: 'dummy_string',
                        created_at: root.google.protobuf.Timestamp._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetBackupRecordsByProject: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        back_up_records: root.itunes_appstore_project.GetBackupRecordsByProject.BackUpRecords._create()
                    }
                }
            },
            BackUpRecords: {
                _create: function(){
                    return {
                        records: root.itunes_appstore_project.GetBackupRecordsByProject.BackUpRecord._create()
                    }
                }
            },
            BackUpRecord: {
                _create: function(){
                    return {
                        backup_id: 'dummy_string',
                        created_at: root.google.protobuf.Timestamp._create(),
                        version: 'dummy_string',
                        language_ids: [64, 64],
                        fileUrl: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        ConnectItunesConnect: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        apple_id: 'dummy_string',
                        password: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        credential_token: 'dummy_string',
                        project_id: 'dummy_string',
                        content_provider_id: 'dummy_string',
                        error_code: 64
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        DisconnectItunesConnect: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        project_id: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        ProjectNotes: {
            IAP: {
                _create: function(){
                    return {
                        product_id: 'dummy_string',
                        display_name: 'dummy_string',
                        description: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                    name: 'dummy_string',
                    description: 'dummy_string',
                    whats_new: 'dummy_string',
                    keyword: 'dummy_string',
                    iaps: root.itunes_appstore_project.ProjectNotes.IAP._create()
                }
            }
        },
        GetNotesForOrder: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        data: root.itunes_appstore_project.GetNotesForOrder.Data._create()
                    }
                }
            },
            Data: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        notes: root.itunes_appstore_project.ProjectNotes._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        Keyword: {
            _create: function(){
                return {
                    language_id: 64,
                    all: 'dummy_string',
                    selected: 'dummy_string'
                }
            }
        },
        GetKeywordsByProjectId: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        project_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        keywords: root.itunes_appstore_project.Keyword._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        UpdateKeywordsSelection: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        project_id: 'dummy_string',
                        keywords: root.itunes_appstore_project.Keyword._create()
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        project_id: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetSource: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        source_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        source: root.itunes_appstore_project.GetSource.Source._create()
                    }
                }
            },
            Source: {
                _create: function(){
                    return {
                        id: 'dummy_string',
                        language_id: 64,
                        last_imported_at: root.google.protobuf.Timestamp._create(),
                        version: 64,
                        meta_data: root.itunes_appstore_project.GetSource.SourceMetaData._create(),
                        keyword: root.itunes_appstore_project.GetSource.SourceIngredient._create(),
                        iaps: root.itunes_appstore_project.GetSource.SourceIAPProduct._create()
                    }
                }
            },
            SourceIngredient: {
                _create: function(){
                    return {
                        id: 'dummy_string',
                        language_id: 64,
                        version: 64,
                        string: 'dummy_string',
                        word_count: 32
                    }
                }
            },
            SourceMetaData: {
                _create: function(){
                    return {
                        app_name: root.itunes_appstore_project.GetSource.SourceIngredient._create(),
                        description: root.itunes_appstore_project.GetSource.SourceIngredient._create(),
                        whats_new: root.itunes_appstore_project.GetSource.SourceIngredient._create()
                    }
                }
            },
            SourceIAPProduct: {
                _create: function(){
                    return {
                        product_id: 'dummy_string',
                        display_name: root.itunes_appstore_project.GetSource.SourceIngredient._create(),
                        description: root.itunes_appstore_project.GetSource.SourceIngredient._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetTranslation: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        translation_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        translation: root.itunes_appstore_project.GetTranslation.Translation._create()
                    }
                }
            },
            Translation: {
                _create: function(){
                    return {
                        id: 'dummy_string',
                        language_id: 64,
                        last_imported_at: root.google.protobuf.Timestamp._create(),
                        version: 64,
                        meta_data: root.itunes_appstore_project.GetTranslation.TranslationMetaData._create(),
                        keyword: root.itunes_appstore_project.GetTranslation.TranslationIngredient._create(),
                        iaps: root.itunes_appstore_project.GetTranslation.TranslationIAPProduct._create()
                    }
                }
            },
            TranslationIngredient: {
                _create: function(){
                    return {
                        id: 'dummy_string',
                        language_id: 64,
                        version: 64,
                        reference_tu_ingredient_id: 'dummy_string',
                        reference_language_id: 64,
                        reference_tu_ingredient_version: 64,
                        string: 'dummy_string',
                        word_count: 32
                    }
                }
            },
            TranslationMetaData: {
                _create: function(){
                    return {
                        app_name: root.itunes_appstore_project.GetTranslation.TranslationIngredient._create(),
                        description: root.itunes_appstore_project.GetTranslation.TranslationIngredient._create(),
                        whats_new: root.itunes_appstore_project.GetTranslation.TranslationIngredient._create()
                    }
                }
            },
            TranslationIAPProduct: {
                _create: function(){
                    return {
                        product_id: 'dummy_string',
                        display_name: root.itunes_appstore_project.GetTranslation.TranslationIngredient._create(),
                        description: root.itunes_appstore_project.GetTranslation.TranslationIngredient._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        iTunesSearchService : {
            searchApp: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.iTunesSearchService.SearchApp)');
                callback(null, root.itunes_appstore_project.SearchResponse._create());
            },
            lookupApp: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.iTunesSearchService.LookupApp)');
                callback(null, root.itunes_appstore_project.LookupApp.Response._create());
            },
            updateProjectSource: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.iTunesSearchService.UpdateProjectSource)');
                callback(null, root.itunes_appstore_project.UpdateProjectSourceFromAppStore.Response._create());
            }
        },
        ProjectService : {
            createPublicProject: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.CreatePublicProject)');
                callback(null, root.itunes_appstore_project.CreatePublicProject.Response._create());
            },
            createItcProject: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.CreateITCProject)');
                callback(null, root.itunes_appstore_project.CreateITCProject.Response._create());
            },
            getProjectsByOrganizationId: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.GetProjectsByOrganizationId)');
                callback(null, root.itunes_appstore_project.GetProjectsByOrganizationId.Response._create());
            },
            getProjectByProjectId: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.GetProjectByProjectId)');
                callback(null, root.itunes_appstore_project.GetProjectByProjectId.Response._create());
            },
            getTranslationOverview: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.GetTranslationOverview)');
                callback(null, root.itunes_appstore_project.GetTranslationOverview.Response._create());
            },
            getLanguageTranslation: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.GetLanguageTranslation)');
                callback(null, root.itunes_appstore_project.GetLanguageTranslation.Response._create());
            },
            getProjectsSummaryByOrganizationId: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.GetProjectsSummaryByOrganizationId)');
                callback(null, root.itunes_appstore_project.GetProjectsSummaryByOrganizationId.Response._create());
            },
            getProjectSummary: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.GetProjectSummary)');
                callback(null, root.itunes_appstore_project.GetProjectSummary.Response._create());
            },
            getProjectSourceByProjectId: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.GetProjectSourceByProjectId)');
                callback(null, root.itunes_appstore_project.GetProjectSourceByProjectId.Response._create());
            },
            updateProjectName: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.UpdateProjectName)');
                callback(null, root.itunes_appstore_project.UpdateProjectName.Response._create());
            },
            deleteProject: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.DeleteProject)');
                callback(null, root.itunes_appstore_project.DeleteProject.Response._create());
            },
            getProjectStatusByProjectId: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.GetProjectStatusByProjectId)');
                callback(null, root.itunes_appstore_project.GetProjectStatusByProjectId.Response._create());
            },
            getTranslationFileUrl: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.GetTranslationFileUrl)');
                callback(null, root.itunes_appstore_project.GetTranslationFileUrl.Response._create());
            },
            addLanguages: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.AddLanguages)');
                callback(null, root.itunes_appstore_project.AddLanguages.Response._create());
            },
            removeLanguages: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.RemoveLanguages)');
                callback(null, root.itunes_appstore_project.RemoveLanguages.Response._create());
            },
            backupProject: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.BackupProject)');
                callback(null, root.itunes_appstore_project.BackupProject.Response._create());
            },
            getBackupRecordsByProject: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.GetBackupRecordsByProject)');
                callback(null, root.itunes_appstore_project.GetBackupRecordsByProject.Response._create());
            },
            connectItunesConnect: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.ConnectItunesConnect)');
                callback(null, root.itunes_appstore_project.ConnectItunesConnect.Response._create());
            },
            disconnectItunesConnect: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.DisconnectItunesConnect)');
                callback(null, root.itunes_appstore_project.DisconnectItunesConnect.Response._create());
            },
            leaveNotes: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.LeaveNotes)');
                callback(null, root.itunes_appstore_project.LeaveNotes.Response._create());
            },
            getNotesForOrder: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.ProjectService.GetNotesForOrder)');
                callback(null, root.itunes_appstore_project.GetNotesForOrder.Response._create());
            }
        },
        KeywordsService : {
            getKeywordsByProjectId: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.KeywordsService.GetKeywordsByProjectId)');
                callback(null, root.itunes_appstore_project.GetKeywordsByProjectId.Response._create());
            },
            updateKeywordsSelection: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.KeywordsService.UpdateKeywordsSelection)');
                callback(null, root.itunes_appstore_project.UpdateKeywordsSelection.Response._create());
            }
        },
        SourceService : {
            getSource: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.SourceService.GetSource)');
                callback(null, root.itunes_appstore_project.GetSource.Response._create());
            }
        },
        TranslationService : {
            getTranslation: function(call, callback){
                console.log('You are using mock of(root.itunes_appstore_project.TranslationService.GetTranslation)');
                callback(null, root.itunes_appstore_project.GetTranslation.Response._create());
            }
        }
    },
    itunes_connect : {
        Error: {
            _create: function(){ return 1; }
        },
        Connect: {
            Request: {
                _create: function(){
                    return {
                        apple_id: 'dummy_string',
                        password: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        credential_token: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        ListApps: {
            Request: {
                _create: function(){
                    return {
                        credential_token: 'dummy_string'
                    }
                }
            },
            Result: {
                _create: function(){
                    return {
                        app_id: 'dummy_string',
                        app_name: 'dummy_string',
                        icon_url: 'dummy_string',
                        content_provider_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        results: root.itunes_connect.ListApps.Result._create(),
                        error: root.itunes_connect.Error._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        IAP_Product: {
            _create: function(){
                return {
                    product_id: 'dummy_string',
                    display_name: 'dummy_string',
                    description: 'dummy_string'
                }
            }
        },
        AppDetailData: {
            _create: function(){
                return {
                    locale: 'dummy_string',
                    app_id: 'dummy_string',
                    app_name: 'dummy_string',
                    description: 'dummy_string',
                    whats_new: 'dummy_string',
                    icon_url: 'dummy_string',
                    keyword: 'dummy_string',
                    version_number: 'dummy_string',
                    primary_language_id: 64,
                    language_ids: [64, 64],
                    iap_list: root.itunes_connect.IAP_Product._create()
                }
            }
        },
        AppDetail: {
            Request: {
                _create: function(){
                    return {
                        credential_token: 'dummy_string',
                        content_provider_id: 'dummy_string',
                        app_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        result: root.itunes_connect.AppDetailData._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        UpdateProjectSourceFromItunesConnect: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        app_id: 'dummy_string',
                        app_store_url: 'dummy_string',
                        icon_url: 'dummy_string',
                        version: 'dummy_string',
                        app_name: 'dummy_string',
                        description: 'dummy_string',
                        whats_new: 'dummy_string',
                        keyword: 'dummy_string',
                        iap_list: root.itunes_connect.IAP_Product._create(),
                        target_language_ids: ['dummy_string', 'dummy_string']
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        result: root.itunes_connect.UpdateProjectSourceFromItunesConnect.Result._create()
                    }
                }
            },
            Result: {
                _create: function(){
                    return {
                        project_id: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        UpdateProjectTranslations: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        target_language_ids: ['dummy_string', 'dummy_string']
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        result: root.itunes_connect.UpdateProjectTranslations.Result._create()
                    }
                }
            },
            Result: {
                _create: function(){
                    return {
                        project_id: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        FetchVersions: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        result: root.itunes_connect.FetchVersions.Result._create()
                    }
                }
            },
            Result: {
                _create: function(){
                    return {
                        live_version: 'dummy_string',
                        deliverable_version: 'dummy_string',
                        inflight_version: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        StartExportToItc: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        export_user_id: 'dummy_string',
                        custom_version_number: 'dummy_string',
                        export_language_ids: [64, 64]
                    }
                }
            },
            Result: {
                _create: function(){
                    return {
                        start_export_at: root.google.protobuf.Timestamp._create()
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        result: root.itunes_connect.StartExportToItc.Result._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        ItunesConnectService : {
            connect: function(call, callback){
                console.log('You are using mock of(root.itunes_connect.ItunesConnectService.Connect)');
                callback(null, root.itunes_connect.Connect.Response._create());
            },
            listApps: function(call, callback){
                console.log('You are using mock of(root.itunes_connect.ItunesConnectService.ListApps)');
                callback(null, root.itunes_connect.ListApps.Response._create());
            },
            appDetail: function(call, callback){
                console.log('You are using mock of(root.itunes_connect.ItunesConnectService.AppDetail)');
                callback(null, root.itunes_connect.AppDetail.Response._create());
            },
            fetchVersions: function(call, callback){
                console.log('You are using mock of(root.itunes_connect.ItunesConnectService.FetchVersions)');
                callback(null, root.itunes_connect.FetchVersions.Response._create());
            },
            updateProjectSource: function(call, callback){
                console.log('You are using mock of(root.itunes_connect.ItunesConnectService.UpdateProjectSource)');
                callback(null, root.itunes_connect.UpdateProjectSourceFromItunesConnect.Response._create());
            },
            updateProjectTranslations: function(call, callback){
                console.log('You are using mock of(root.itunes_connect.ItunesConnectService.UpdateProjectTranslations)');
                callback(null, root.itunes_connect.UpdateProjectTranslations.Response._create());
            },
            startExportToItc: function(call, callback){
                console.log('You are using mock of(root.itunes_connect.ItunesConnectService.StartExportToItc)');
                callback(null, root.itunes_connect.StartExportToItc.Response._create());
            }
        }
    },
    itunes_order_order : {
        Error: {
            _create: function(){ return 1; }
        },
        SourceSnapshotCreated: {
            _create: function(){
                return {
                    occurred_on: root.google.protobuf.Timestamp._create(),
                    project_id: 'dummy_string',
                    source_snapshot_id: 'dummy_string',
                    source_language_id: 64
                }
            }
        },
        TranslationSnapshotCreated: {
            _create: function(){
                return {
                    occurred_on: root.google.protobuf.Timestamp._create(),
                    project_id: 'dummy_string',
                    translation_snapshot_id: 'dummy_string',
                    translation_language_id: 64
                }
            }
        },
        QuotationApproved: {
            _create: function(){
                return {
                    occurred_on: root.google.protobuf.Timestamp._create(),
                    quotation_id: 'dummy_string'
                }
            }
        },
        TranslationSnapshotsDeleted: {
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    translation_language_id: 64,
                    occurred_on: root.google.protobuf.Timestamp._create()
                }
            }
        },
        TranslatableContent: {
            _create: function(){
                return {
                    id: 'dummy_string',
                    string: 'dummy_string'
                }
            }
        },
        TranslatableIAPContent: {
            _create: function(){
                return {
                    product_id: 'dummy_string',
                    display_name: root.itunes_order_order.TranslatableContent._create(),
                    description: root.itunes_order_order.TranslatableContent._create()
                }
            }
        },
        TranslatedContent: {
            _create: function(){
                return {
                    string: 'dummy_string'
                }
            }
        },
        TranslatedIAPContent: {
            _create: function(){
                return {
                    product_id: 'dummy_string',
                    display_name: root.itunes_order_order.TranslatedContent._create(),
                    description: root.itunes_order_order.TranslatedContent._create()
                }
            }
        },
        TranslationUnit: {
            _create: function(){
                return {
                    source: root.itunes_order_order.TranslatableContent._create(),
                    translation: root.itunes_order_order.TranslatedContent._create()
                }
            }
        },
        IAPTranslationUnit: {
            _create: function(){
                return {
                    product_id: 'dummy_string',
                    display_name: root.itunes_order_order.TranslationUnit._create(),
                    description: root.itunes_order_order.TranslationUnit._create()
                }
            }
        },
        Sources: {
            _create: function(){
                return {
                    app_name: root.itunes_order_order.TranslatableContent._create(),
                    description: root.itunes_order_order.TranslatableContent._create(),
                    whats_new: root.itunes_order_order.TranslatableContent._create(),
                    keyword: root.itunes_order_order.TranslatableContent._create(),
                    iaps: root.itunes_order_order.TranslatableIAPContent._create()
                }
            }
        },
        Translations: {
            _create: function(){
                return {
                    app_name: root.itunes_order_order.TranslatedContent._create(),
                    description: root.itunes_order_order.TranslatedContent._create(),
                    whats_new: root.itunes_order_order.TranslatedContent._create(),
                    keyword: root.itunes_order_order.TranslatedContent._create(),
                    iaps: root.itunes_order_order.TranslatedIAPContent._create()
                }
            }
        },
        PlaceOrder: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        quotation_id: 'dummy_string',
                        payment_token: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        order_id: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetOrders: {
            Request: {
                _create: function(){
                    return {
                        order_ids: ['dummy_string', 'dummy_string']
                    }
                }
            },
            OrderItem: {
                _create: function(){
                    return {
                        to_language_id: 64,
                        status: 32,
                        word_count: 32,
                        delivery_date: root.google.protobuf.Timestamp._create(),
                        order_item_id: 'dummy_string'
                    }
                }
            },
            Order: {
                _create: function(){
                    return {
                        order_id: 'dummy_string',
                        from_language_id: 64,
                        paid_total: 'dummy_string',
                        status: 32,
                        creation_date: root.google.protobuf.Timestamp._create(),
                        items: root.itunes_order_order.GetOrders.OrderItem._create(),
                        project_id: 'dummy_string',
                        project_name: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        orders: root.itunes_order_order.GetOrders.Order._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetProjectOrdersByOrganizationId: {
            Request: {
                _create: function(){
                    return {
                        organization_id: 'dummy_string'
                    }
                }
            },
            Order: {
                _create: function(){
                    return {
                        order_id: 'dummy_string',
                        project_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        result: root.itunes_order_order.GetProjectOrdersByOrganizationId.Order._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetTranslations: {
            Request: {
                _create: function(){
                    return {
                        order_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        to_language_id: 64
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        sources: root.itunes_order_order.Sources._create(),
                        translations: root.itunes_order_order.Translations._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetDeliveredTranslations: {
            TranslatableContent: {
                _create: function(){
                    return {
                        id: 'dummy_string',
                        language_id: 64,
                        version: 64,
                        string: 'dummy_string'
                    }
                }
            },
            TranslationPair: {
                _create: function(){
                    return {
                        ref: root.itunes_order_order.GetDeliveredTranslations.TranslatableContent._create(),
                        translation_string: 'dummy_string'
                    }
                }
            },
            TranslatedIAPContent: {
                _create: function(){
                    return {
                        product_id: 'dummy_string',
                        display_name: root.itunes_order_order.GetDeliveredTranslations.TranslationPair._create(),
                        description: root.itunes_order_order.GetDeliveredTranslations.TranslationPair._create()
                    }
                }
            },
            Translations: {
                _create: function(){
                    return {
                        app_name: root.itunes_order_order.GetDeliveredTranslations.TranslationPair._create(),
                        description: root.itunes_order_order.GetDeliveredTranslations.TranslationPair._create(),
                        whats_new: root.itunes_order_order.GetDeliveredTranslations.TranslationPair._create(),
                        keyword: root.itunes_order_order.GetDeliveredTranslations.TranslationPair._create(),
                        iaps: root.itunes_order_order.GetDeliveredTranslations.TranslatedIAPContent._create()
                    }
                }
            },
            Request: {
                _create: function(){
                    return {
                        order_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        to_language_id: 64
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        translations: root.itunes_order_order.GetDeliveredTranslations.Translations._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetOrdersStatusByProjectId: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        ordersStatus: root.itunes_order_order.GetOrdersStatusByProjectId.OrderStatus._create()
                    }
                }
            },
            OrderStatus: {
                _create: function(){
                    return {
                        id: 'dummy_string',
                        status: 32
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetOrderForCommunication: {
            Request: {
                _create: function(){
                    return {
                        order_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        order: root.itunes_order_order.GetOrderForCommunication.Order._create()
                    }
                }
            },
            Order: {
                _create: function(){
                    return {
                        order_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        user_id: 'dummy_string',
                        order_item_ids: ['dummy_string', 'dummy_string'],
                        first_message_to_translator: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        OrderService : {
            placeOrder: function(call, callback){
                console.log('You are using mock of(root.itunes_order_order.OrderService.PlaceOrder)');
                callback(null, root.itunes_order_order.PlaceOrder.Response._create());
            },
            getOrders: function(call, callback){
                console.log('You are using mock of(root.itunes_order_order.OrderService.GetOrders)');
                callback(null, root.itunes_order_order.GetOrders.Response._create());
            },
            getOrdersStatusByProjectId: function(call, callback){
                console.log('You are using mock of(root.itunes_order_order.OrderService.GetOrdersStatusByProjectId)');
                callback(null, root.itunes_order_order.GetOrdersStatusByProjectId.Response._create());
            },
            getDeliveredTranslations: function(call, callback){
                console.log('You are using mock of(root.itunes_order_order.OrderService.GetDeliveredTranslations)');
                callback(null, root.itunes_order_order.GetDeliveredTranslations.Response._create());
            },
            getTranslations: function(call, callback){
                console.log('You are using mock of(root.itunes_order_order.OrderService.GetTranslations)');
                callback(null, root.itunes_order_order.GetTranslations.Response._create());
            },
            getOrderForCommunication: function(call, callback){
                console.log('You are using mock of(root.itunes_order_order.OrderService.GetOrderForCommunication)');
                callback(null, root.itunes_order_order.GetOrderForCommunication.Response._create());
            },
            getProjectOrdersByOrganizationId: function(call, callback){
                console.log('You are using mock of(root.itunes_order_order.OrderService.GetProjectOrdersByOrganizationId)');
                callback(null, root.itunes_order_order.GetProjectOrdersByOrganizationId.Response._create());
            }
        }
    },
    itunes_order_quotation : {
        Error: {
            _create: function(){ return 1; }
        },
        TranslationServiceType: {
            _create: function(){ return 1; }
        },
        TranslatableContentType: {
            _create: function(){ return 1; }
        },
        Specialization: {
            _create: function(){
                return {
                    code: 'dummy_string',
                    description: 'dummy_string'
                }
            }
        },
        QuotationInfo: {
            _create: function(){
                return {
                    project_id: 'dummy_string',
                    from_language_ids: ['dummy_string', 'dummy_string'],
                    to_language_ids: ['dummy_string', 'dummy_string']
                }
            }
        },
        Quotation: {
            _create: function(){
                return {
                    id: 'dummy_string',
                    from_language_id: 'dummy_string',
                    items: root.itunes_order_quotation.QuotationItem._create(),
                    available_to_language_ids: ['dummy_string', 'dummy_string']
                }
            }
        },
        QuotationItem: {
            _create: function(){
                return {
                    to_language_id: 'dummy_string',
                    pricing: root.itunes_order_quotation.Pricing._create(),
                    word_count: 32,
                    delivery_date: root.google.protobuf.Timestamp._create()
                }
            }
        },
        Pricing: {
            _create: function(){
                return {
                    service_type: root.itunes_order_quotation.TranslationServiceType._create(),
                    value: 22
                }
            }
        },
        ToLanguage: {
            _create: function(){
                return {
                    language_id: 'dummy_string',
                    service_type: root.itunes_order_quotation.TranslationServiceType._create()
                }
            }
        },
        TranslatableString: {
            _create: function(){
                return {
                    value: 'dummy_string'
                }
            }
        },
        GetQuotationInfo: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        user_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        quotation_info: root.itunes_order_quotation.QuotationInfo._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetSpecializations: {
            Request: {
                _create: function(){
                    return {
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        specializations: root.itunes_order_quotation.Specialization._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        CreateQuotation: {
            Request: {
                _create: function(){
                    return {
                        project_id: 'dummy_string',
                        user_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        specialization_code: 'dummy_string',
                        translatable_content_type: root.itunes_order_quotation.TranslatableContentType._create(),
                        from_language_id: 'dummy_string',
                        to_languages: root.itunes_order_quotation.ToLanguage._create()
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        quotation: root.itunes_order_quotation.Quotation._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        TranslatableContent: {
            IAPProduct: {
                _create: function(){
                    return {
                        product_id: 'dummy_string',
                        display_name: root.itunes_order_quotation.TranslatableString._create(),
                        description: root.itunes_order_quotation.TranslatableString._create()
                    }
                }
            },
            _create: function(){
                return {
                    app_name: root.itunes_order_quotation.TranslatableString._create(),
                    description: root.itunes_order_quotation.TranslatableString._create(),
                    whats_new: root.itunes_order_quotation.TranslatableString._create(),
                    keyword: root.itunes_order_quotation.TranslatableString._create(),
                    iap_products: root.itunes_order_quotation.TranslatableContent.IAPProduct._create()
                }
            }
        },
        GetQuotationItemTranslatableContent: {
            Request: {
                _create: function(){
                    return {
                        quotation_id: 'dummy_string',
                        to_language_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        quotation_id: 'dummy_string',
                        to_language_id: 'dummy_string',
                        translatable_content: root.itunes_order_quotation.TranslatableContent._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        GetApprovedQuotation: {
            Request: {
                _create: function(){
                    return {
                        quotation_id: 'dummy_string',
                        organization_id: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        quotation: root.itunes_order_quotation.Quotation._create()
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        ApproveQuotation: {
            Request: {
                _create: function(){
                    return {
                        quotation_id: 'dummy_string',
                        organization_id: 'dummy_string',
                        creator_user_id: 'dummy_string',
                        note_to_translator: 'dummy_string'
                    }
                }
            },
            Response: {
                _create: function(){
                    return {
                        quotation_id: 'dummy_string'
                    }
                }
            },
            _create: function(){
                return {
                }
            }
        },
        QuotationService : {
            getQuotationInfo: function(call, callback){
                console.log('You are using mock of(root.itunes_order_quotation.QuotationService.GetQuotationInfo)');
                callback(null, root.itunes_order_quotation.GetQuotationInfo.Response._create());
            },
            getSpecializations: function(call, callback){
                console.log('You are using mock of(root.itunes_order_quotation.QuotationService.GetSpecializations)');
                callback(null, root.itunes_order_quotation.GetSpecializations.Response._create());
            },
            createQuotation: function(call, callback){
                console.log('You are using mock of(root.itunes_order_quotation.QuotationService.CreateQuotation)');
                callback(null, root.itunes_order_quotation.CreateQuotation.Response._create());
            },
            getQuotationItemTranslatableContent: function(call, callback){
                console.log('You are using mock of(root.itunes_order_quotation.QuotationService.GetQuotationItemTranslatableContent)');
                callback(null, root.itunes_order_quotation.GetQuotationItemTranslatableContent.Response._create());
            },
            getApprovedQuotation: function(call, callback){
                console.log('You are using mock of(root.itunes_order_quotation.QuotationService.GetApprovedQuotation)');
                callback(null, root.itunes_order_quotation.GetApprovedQuotation.Response._create());
            },
            approveQuotation: function(call, callback){
                console.log('You are using mock of(root.itunes_order_quotation.QuotationService.ApproveQuotation)');
                callback(null, root.itunes_order_quotation.ApproveQuotation.Response._create());
            }
        }
    }
};
module.exports = root;
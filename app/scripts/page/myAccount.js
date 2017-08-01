(function() {
  'use strict';
  var Materialize = window.Materialize;
  /**
   * Regex for checking mail http://devilmaycode.altervista.org/jquery-validate-e-mail-address-regex/
   * @param  {String}  emailAddress email address
   * @return {Boolean} true if valid mail
   */
  function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
  }
  var myAccount = {
    init(options) {
      let defaults = {
        container: false,
        updateOnLoad: true
      };
      var settings = Object.assign({}, defaults, options);
      var page = myAccount.component.main();
      if (settings.container) {
        settings.container.append(page);
      }
      if (settings.updateOnLoad) {
        page.on('onRender', function() {
          page.trigger('displayUserData', [settings]);
        });
      }
      return page;
    },
    component: {
      main: function() {
        var id = {
          main: window.app.guid(),
          userBase: window.app.guid()
        };
        var block = $(
          '<div class="row flow-text" id="'+id.main+'">'+
            '<div class="col s12">'+
              '<div class="row" id="'+id.userBase+'">'+
                '<div class="col s12 center-align">'+
                  '<div class="preloader-wrapper big active">'+
                    '<div class="spinner-layer spinner-blue">'+
                      '<div class="circle-clipper left">'+
                        '<div class="circle"></div>'+
                      '</div><div class="gap-patch">'+
                        '<div class="circle"></div>'+
                      '</div><div class="circle-clipper right">'+
                        '<div class="circle"></div>'+
                      '</div>'+
                    '</div>'+
                    '<div class="spinner-layer spinner-red">'+
                      '<div class="circle-clipper left">'+
                        '<div class="circle"></div>'+
                      '</div><div class="gap-patch">'+
                        '<div class="circle"></div>'+
                      '</div><div class="circle-clipper right">'+
                        '<div class="circle"></div>'+
                      '</div>'+
                    '</div>'+
                    '<div class="spinner-layer spinner-yellow">'+
                      '<div class="circle-clipper left">'+
                        '<div class="circle"></div>'+
                      '</div><div class="gap-patch">'+
                        '<div class="circle"></div>'+
                      '</div><div class="circle-clipper right">'+
                        '<div class="circle"></div>'+
                      '</div>'+
                    '</div>'+
                    '<div class="spinner-layer spinner-green">'+
                      '<div class="circle-clipper left">'+
                        '<div class="circle"></div>'+
                      '</div><div class="gap-patch">'+
                        '<div class="circle"></div>'+
                      '</div><div class="circle-clipper right">'+
                        '<div class="circle"></div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'
        );
        block.data('id', id);
        block.on('displayUserData', function() {
          window.get().currentUser(function(userData) {
            block.find('#'+id.userBase).empty().append(myAccount.component.userBase(userData));
            // @TODO append component here
          });
        });
        return block;
      },
      userBase(userData) {
        var id = {
          picture: window.app.guid(),
          username: window.app.guid(),
          email: window.app.guid(),
          edit: window.app.guid(),
          signout: window.app.guid()
        };
        var block = $(
          '<div class="col s12 center-align">'+
            '<div class="card">'+
              '<div class="card-content center-align">'+
                '<img src="'+userData.profilePicture+'" class="circle"><br>'+
                userData.username+'<br>'+
                userData.email+
              '</div>'+
              '<div class="card-action">'+
                '<a href="javascript:void(0);" id="'+id.edit+'">Modifier mes informations</a><br>'+
                '<a href="javascript:void(0);">Me déconnecter</a>'+
              '</div>'+
            '</div>'+
          '</div>'
        );
        block.find('#'+id.edit).on('click', function() {
          myAccount.component.userBaseEdit(userData);
        });
        block.find('#'+id.signout).on('click', function() {
          window.app.disconnect();
        });
        return block;
      },
      userBaseEdit(userData) {
        var id = {
          main: window.app.guid(),
          username: window.app.guid(),
          email: window.app.guid(),
          valid: window.app.guid()
        };
        var modal = $(
          '<div class="modal modal-fixed-footer" id="'+id.main+'">'+
            '<div class="modal-content">'+
              '<h4>Modifier mon compte</h4>'+
              '<div class="row">'+
                '<div class="col s12 input-field">'+
                  '<input type="text" value="'+userData.username+'" id="'+id.username+'" class="validate valid">'+
                  '<label for="'+id.username+'" class="active">Pseudo</label>'+
                '</div>'+
                '<div class="col s12 input-field">'+
                  '<input type="email" value="'+userData.email+'" id="'+id.email+'" class="validate valid">'+
                  '<label for="'+id.email+'" class="active">Adresse mail</label>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="modal-footer">'+
              '<a id="'+id.valid+'" class="modal-action waves-effect waves-green btn-flat">Valider</a>'+
              '<a class="modal-action modal-close waves-effect waves-red btn-flat">Annuler</a>'+
            '</div>'+
          '</div>'
        );
        var validation = {
          mail: true,
          username: true
        };
        // checking mail on change
        modal.find('#'+id.email).on('change', function() {
          var mail = $(this).val();
          validation.mail = isValidEmailAddress(mail);
          if (!validation.mail) {
            $(this).removeClass('valid').addClass('invalid');
          }
        });
        modal.find('#'+id.username).on('change', function() {
          var username = $(this).val();
          validation.username = Boolean(!username);
        });
        modal.find('#'+id.valid).on('click', function() {
          var valid = true;
          for (let field in validation) {
            if (!validation[field]) {
              valid = false;
            }
          }
          if (!valid) {
            Materialize.toast('<i class="material-icons left">warning</i> Veuillez vérifier le formulaire.', 2500, 'orange-text');
            return false;
          }
          // @TODO
        });
        // append & open modal
        $('body').append(modal);
        $(modal).modal('open', {
          startingTop: '50%',
          endingTop: '10%',
          ready: function(modal, trigger) {
            window.console.log(modal, trigger);
          },
          complete: function() {
            modal.remove();
          }
        });
      }
    }
  };
  window.app.myAccount = function() {
    return myAccount;
  };
})();

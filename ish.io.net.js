/** ################################################################################################
 * @class ish
 * @classdesc ishJS Functionality (Q: Are you using Vanilla Javascript? A: ...ish)
 * @author Nick Campbell
 * @license MIT
################################################################################################# */
!function (core) {
    'use strict';


    /*
    ####################################################################################################
    Class: core.io.net
    Input/Output-based Networking functionality.
    Requires:
    <core.resolve>, <core.extend>, 
    <core.type.fn.is>, <core.type.str.is>, <core.type.obj.is>, <core.type.fn.is>, 
    <core.type.fn.tryCatch>, <core.type.fn.call>
    ####################################################################################################
    */
    core.oop.partial(core.io, function (/*oProtected*/) {
        var oCache = {},
            oXHROptions = {
                async: true,
                cache: true, //# true
                useCache: false
                //beforeSend: undefined,
                //onreadystatechange: undefined
            }
        ;

        //# Wrapper for an XHR AJAX call
        function xhr(sVerb, bAsync, sUrl, vCallback) {
            /* global ActiveXObject: false */ //# JSHint "ActiveXObject variable undefined" error supressor
            var $xhr, bValidRequest,
                bAbort = false,
                oData = core.resolve(oCache, [sVerb.toLowerCase(), sUrl]),
                XHRConstructor = (XMLHttpRequest || ActiveXObject)
            ;

            //# IE5.5+ (ActiveXObject IE5.5-9), based on http://toddmotto.com/writing-a-standalone-ajax-xhr-javascript-micro-library/
            try {
                $xhr = new XHRConstructor('MSXML2.XMLHTTP.3.0');
            } catch (e) { core.type.ish.expectedErrorHandler(e); }

            //# If a function was passed rather than an object, object-ize it (else we assume its an object with at least a .fn)
            if (core.type.fn.is(vCallback)) {
                vCallback = { fn: vCallback, arg: null /*, cache: oXHROptions.cache, useCache: oXHROptions.useCache */ };
            }

            //# Determine if this is a bValidRequest
            bValidRequest = ($xhr && core.type.str.is(sUrl, true));

            //# If we are supposed to .useCache and we were able to find the oData in the oCache
            if ((vCallback.useCache || oXHROptions.useCache) && core.type.obj.is(oData)) {
                //#
                $xhr.fromCache = true;
                vCallback.fn( /* bSuccess, oData, vArg, $xhr */
                    (oData.status === 200 || (oData.status === 0 && oData.url.substr(0, 7) === "file://")),
                    oData,
                    vCallback.arg,
                    $xhr
                );
            }
            //# Else if we were able to collect an $xhr object and we have an sUrl
            else if (bValidRequest) {
                //# Setup the $xhr callback
                //$xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                $xhr.onreadystatechange = function () {
                    //# If the request is finished and the .responseText is ready
                    if ($xhr.readyState === 4) {
                        oData = {
                            status: $xhr.status,
                            text: $xhr.responseText,
                            json: core.type.fn.tryCatch(JSON.parse)($xhr.responseText),
                            url: sUrl,
                            verb: sVerb,
                            async: bAsync,
                            aborted: bAbort,
                            loaded: ($xhr.status === 200 || ($xhr.status === 0 && sUrl.substr(0, 7) === "file://"))
                        };
                        oData.data = oData.json; //# TODO: Remove

                        //#
                        if (vCallback.cache || oXHROptions.cache) {
                            core.resolve(true, oCache, [sVerb.toLowerCase(), sUrl], oData);
                        }

                        //#
                        vCallback.fn(/* bSuccess, oData, vArg, $xhr */
                            !bAbort && oData.loaded,
                            oData,
                            vCallback.arg,
                            $xhr
                        );
                    }
                };
            }
            //# Else we were unable to collect the $xhr, so signal a failure to the vCallback.fn
            else {
                core.type.fn.call(vCallback.fn, [false, null, vCallback.arg, $xhr]);
            }

            return {
                xhr: $xhr,
                send: function(vBody, fnHook) {
                    var a_sKeys, i,
                        sBody = ""
                    ;

                    //# If we were able to collect an $xhr object and we have an sUrl, .open and .send the request now
                    if (bValidRequest) {
                        $xhr.open(sVerb, sUrl, !!bAsync);

                        //# 
                        if (core.type.str.is(vBody)) {
                            sBody = vBody;
                        }
                        else if (core.type.obj.is(vBody)) {
                            sBody = JSON.stringify(vBody);
                        }
                        else if (core.type.is.val(vBody)) {
                            sBody = core.type.str.mk(vBody);
                        }

                        //#
                        if (core.type.fn.is(fnHook)) {
                            fnHook($xhr);
                        }
                        //#
                        else {
                            if (core.type.obj.is(vCallback.headers)) {
                                a_sKeys = core.type.obj.ownKeys(vCallback.headers);
                                for (i = 0; i < a_sKeys.length; i++) {
                                    $xhr.setRequestHeader(a_sKeys[i], vCallback.headers[a_sKeys[i]]);
                                }
                            }
                            $xhr.overrideMimeType(core.type.str.is(vCallback.mimeType, true) ? vCallback.mimeType : 'text/plain; charset=utf-8');
                        }

                        $xhr.send(sBody || null);
                    }
                },
                abort: function () {
                    bAbort = true;
                    $xhr.abort();
                    core.io.console.warn("ish.io.net: Aborted " + sVerb + " " + sUrl);
                }
            };
        } //# xhr
        xhr.options = function (oOptions) {
            core.extend(oXHROptions, oOptions);
            return oXHROptions;
        }; //# xhr.options


        //# see: https://developers.google.com/web/fundamentals/primers/promises
        //function promise() {
        //}


        //#
        function doGet(sUrl, vCallback) {
            var oReturnVal = xhr("GET", oXHROptions.async, sUrl, vCallback);
            oReturnVal.send();
            return oReturnVal;
        }
        function doPost(sUrl, oBody, vCallback) {
            var oReturnVal = xhr("POST", oXHROptions.async, sUrl, vCallback);
            oReturnVal.send(oBody);
            return oReturnVal;
        }
        function doPut(sUrl, oBody, vCallback) {
            var oReturnVal = xhr("PUT", oXHROptions.async, sUrl, vCallback);
            oReturnVal.send(oBody);
            return oReturnVal;
        }
        function doDelete(sUrl, vCallback) {
            var oReturnVal = xhr("DELETE", oXHROptions.async, sUrl, vCallback);
            oReturnVal.send();
            return oReturnVal;
        }
        function doHead(sUrl, vCallback) {
            var oReturnVal = xhr("HEAD", oXHROptions.async, sUrl, vCallback);
            oReturnVal.send();
            return oReturnVal;
        }


        //# Return the core.io.net functionality
        return {
            net: {
                crud: {
                    create: doPut,
                    read: doGet,
                    update: doPost,
                    'delete': doDelete
                },

                cache: function (oImportCache) {
                    core.extend(oCache, oImportCache);
                    return oCache;
                },

                xhr: xhr,
                //promise: promise,
                //xhr.options = xhr.options,

                get: doGet,
                put: doPut,
                post: doPost,
                'delete': doDelete,
                head: doHead,
                ping: function (sUrl, vCallback) {
                    doHead(sUrl, vCallback || function (/* bSuccess, oData, vArg, $xhr */) {});
                }
            }
        };
    }); //# core.io.net

}(document.querySelector("SCRIPT[ish]").ish);
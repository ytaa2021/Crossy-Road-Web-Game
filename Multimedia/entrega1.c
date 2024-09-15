/*
 *
 * Proyecto GStreamer - Aplicaciones Multimedia (2020-2021)
 * Universidad Carlos III de Madrid
 *
 * Equipo (TO DO: rellenar con los datos adecuados):
 * - Alvaro Augusto Espinoza Chonlón 100451663
 * - Mónica Treviño Fernández 100451352
 * - David Torregrosa González 100451620
 * - Yotam Twersky 100531090
 *
 * Versión implementada :
 * - pipeline
 * - reproducción mp3 visualmente (goom)
 * - conversión mp3 a ogg
 *  - manejar eventos de teclado (mostrar tiempo)
 */

// ------------------------------------------------------------
// Procesar argumentos
// ------------------------------------------------------------

// REF: https://www.gnu.org/software/libc/manual/html_node/Parsing-Program-Arguments.html#Parsing-Program-Arguments

/*
 * Argumentos del programa:
 * -h: presenta la ayuda y termina (con estado 0).
 * -f fichero_mp3: nombre del fichero del audio de entrada en formato MP3.
 * -o fichero_ogg: nombre del fichero del audio que se va a generar en formato OGG.
 * -t: responde al evento de teclado para poner el instante de tiempo enla imagen visualizada.
 */
#include <gst/gst.h>
#include <glib.h>
#include <stdio.h>
#include <string.h>

#include <ctype.h>
#include <stdlib.h>
#include <unistd.h>

GstElement *queue_vid, *queue_vid2, *queue_aud,*queue_aud2;

// Callback para cuando se añade un nuevo pad al decodebin
void on_pad_added(GstElement *element, GstPad *pad, gpointer data)
{
	GstPad *sinkpad;

	char *caps = gst_caps_to_string(gst_pad_get_current_caps(pad));

	if (g_str_has_prefix(caps, "audio"))
	{
		// Creamos el sink para audio
		sinkpad = gst_element_get_static_pad(queue_aud, "sink");
	}
	else if (g_str_has_prefix(caps, "video"))
	{
		// Creamos el sink para video
		sinkpad = gst_element_get_static_pad(queue_vid, "sink");
	}

	if (sinkpad != NULL)
	{
		// conectamos el pad creado al sumidero
		gst_pad_link(pad, sinkpad);

		// borramos
		gst_object_unref(sinkpad);
	}
}
void on_pad_added2(GstElement *element, GstPad *pad, gpointer data)
{
	GstPad *sinkpad;

	char *caps = gst_caps_to_string(gst_pad_get_current_caps(pad));

	if (g_str_has_prefix(caps, "audio"))
	{
		// Creamos el sink para audio
		sinkpad = gst_element_get_static_pad(queue_aud2, "sink");
	}
	else if (g_str_has_prefix(caps, "video"))
	{
		// Creamos el sink para video
		sinkpad = gst_element_get_static_pad(queue_vid2, "sink");
	}

	if (sinkpad != NULL)
	{
		// conectamos el pad creado al sumidero
		gst_pad_link(pad, sinkpad);

		// borramos
		gst_object_unref(sinkpad);
	}
}

int main(int argc, char *argv[]) {
    GstElement *pipeline, *source1, *source2, *decoder1, *decoder2, *compositor, *videoconvert, *sink;

   	char *filename = NULL;
	char *filename2 = NULL;

    int c;
    
    opterr = 0; // no es necesario declararla, la exporta getopt


	while ((c = getopt(argc, argv, "hf:g:")) != -1)
	{
		switch (c)
		{
		case 'h':
			// ayuda
			g_print("-----------AYUDA-----------\n");
            g_print("   -f : para insertar tu video 1\n");
            g_print("   -g : para insertar tu video 2\n");
			return 0;

		case 'f':
            filename = optarg;
			break;
        case 'g':
            filename2 = optarg;
            break;

		default:
			fprintf(stderr,
					"Error: argumento %d no válido\n", optind);

			return 1;
		}
	}
    if (filename == NULL || filename2 == NULL) {
        printf("Error: Se esperaban dos argumentos para las opciones -f y -g.\n");
        return -1;
    }
	// getopt recoloca los argumentos no procesados al final
	// el primero será el nombre del fichero de entrada (es correcto)
	// si hay algún otro: error argumento desconocido
	for (int index = optind + 1; index < argc; index++)
	{
		printf("Error: argumento %s no válido\n", argv[index]);
		return 1;
	}

    
    // Inicializar GStreamer
    gst_init(&argc, &argv);

    // Crear elementos
    pipeline = gst_pipeline_new("video-overlay-pipeline");
    source1 = gst_element_factory_make("filesrc", "source1");
    source2 = gst_element_factory_make("filesrc", "source2");
    decoder1 = gst_element_factory_make("decodebin", "decoder1");
    decoder2 = gst_element_factory_make("decodebin", "decoder2");
    queue_vid = gst_element_factory_make("queue", "queue_vid");
    queue_vid2 = gst_element_factory_make("queue", "queue_vid2");
    queue_aud = gst_element_factory_make("queue", "queue_aud");
    queue_aud2 = gst_element_factory_make("queue", "queue_aud2");
    compositor = gst_element_factory_make("compositor", "compositor");
    videoconvert = gst_element_factory_make("videoconvert", "videoconvert");
    sink = gst_element_factory_make("autovideosink", "sink");

    if (!pipeline || !source1 || !source2 || !decoder1 || !decoder2 || !queue_vid || !queue_vid2 || !compositor|| !queue_aud || !queue_aud2 || !videoconvert || !sink) {
        g_printerr("No se pudo crear uno o más elementos.\n");
        return -1;
    }

    // Configurar elementos
    g_object_set(G_OBJECT(source1), "location", filename, NULL);
    g_object_set(G_OBJECT(source2), "location", filename2, NULL);

    // Construir la pipeline
    gst_bin_add_many(GST_BIN(pipeline), source1, decoder1, queue_vid, source2, decoder2, queue_vid2, compositor, videoconvert, queue_aud,queue_aud2, sink, NULL);

    // Conectar elementos estáticamente
    if (!gst_element_link_many(source1, decoder1, NULL) ||
        !gst_element_link_many(source2, decoder2, NULL) ||
        !gst_element_link_many(queue_vid, compositor, NULL) ||
        !gst_element_link_many(queue_vid2, compositor, NULL) ||
        !gst_element_link_many(compositor, videoconvert, sink, NULL)) {
        g_printerr("Los elementos no pudieron ser enlazados.\n");
        gst_object_unref(pipeline);
        return -1;
    }

    // Conectar dinámicamente los pads de decodebin a las colas
    g_signal_connect(decoder1, "pad-added", G_CALLBACK(on_pad_added), NULL);
    g_signal_connect(decoder2, "pad-added", G_CALLBACK(on_pad_added2), NULL);

    // Iniciar reproducción
    gst_element_set_state(pipeline, GST_STATE_PLAYING);

    // Esperar hasta que ocurra un error o EOS
    GMainLoop *main_loop = g_main_loop_new(NULL, FALSE);
    g_main_loop_run(main_loop);

    // Limpieza
    gst_element_set_state(pipeline, GST_STATE_NULL);
    gst_object_unref(GST_OBJECT(pipeline));
    g_main_loop_unref(main_loop);

    return 0;
}


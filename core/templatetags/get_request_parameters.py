from django import template

register = template.Library()

@register.simple_tag(takes_context=True)
def get_current_parameters(context):
    request = context['request']
    out = request.META.get('QUERY_STRING', '')
    if len(out):
        out = "?" + out
    return out